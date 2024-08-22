import puppeteer from 'puppeteer';
import { runChat } from './gemini.js';
import { Job } from './models/Job.js';
import { pesquisas } from './gupyQueries.js';


(async () => {
  for (const chave in pesquisas) {
    if (pesquisas.hasOwnProperty(chave)) {
      //  console.log(`Tipo de pesquisa: ${chave}`);
        const urls = pesquisas[chave];

        // Iterando sobre os arrays de URLs
        for (let i = 0; i < urls.length; i++) {
          try {
            const url = urls[i];
            //console.log(`URL ${i + 1}: ${url}`);

            const resultJobsSearch = await findJobs(url); // ({ link:href, company:company });

            const subarrays = dividirArray(resultJobsSearch, 60);

            for(let arrayLinks in subarrays) {

              let jobsRequirements = await mustHaveRequirements(subarrays[arrayLinks]); // ENTRAR ARRAY DE LINKS
              let geminiRequest = "";
          
              for (let i in jobsRequirements) {
                const jobLink = jobsRequirements[i].link;
                geminiRequest = geminiRequest.concat(`vaga_${[i]}` + " " + jobsRequirements[i].requisitos);
                const startIndex = jobLink.indexOf("/job/") + 5;
                const endIndex = jobLink.indexOf("?jobBoardSource=");
                const extractedId = jobLink.substring(startIndex, endIndex);
            
                jobsRequirements[i].id = extractedId;
              }
              
              const jsonRequisite = await runChat(geminiRequest);
              await new Promise(resolve => setTimeout(resolve, 60000));
              const regex = /```json([\s\S]+?)```/;
              const match = jsonRequisite.match(regex);

              if (match) {
                const jsonStringContent = match[1].trim();
                const jsonContent = JSON.parse(jsonStringContent)
                //console.log(jsonContent); // aqui temos o objeto
            
                // console.log(jsonContent.vaga_1);
            
                for (let i in jobsRequirements) {
                  const vaga = jsonContent[`vaga_${i}`]; // Obtém os requisitos da vaga correspondente
                  if (vaga) {
                    const arrayUnico = [].concat(...Object.values(vaga));
                    const stringUnica = arrayUnico.join(', ');
                    jobsRequirements[i].requisitos = stringUnica;
                  }
                }
               // console.log(jobsRequirements);
            
                const dadosParaInserir = returnJobObject(jobsRequirements, chave)
                
                for (let vaga in dadosParaInserir){

                  Job.create(dadosParaInserir[vaga])
                  .then(resultados => {
                    console.log('Registros inseridos com sucesso:');
                  })
                  .catch(erro => {
                    console.log('Erro ao inserir registros:', erro);
                  });

                }


                  await new Promise(resolve => setTimeout(resolve, 60000));
            
              } else {
                console.log("Nenhuma correspondência encontrada.");
              }
            
            
            }


           
          

          }catch (e) {

            console.log("LOG: erro na execução da " + "  " + e.message)
          }

            
        }
    }
  }



})();



async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const scrollInterval = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 100);
    });
  });
}

async function findJobs(pesquisas) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const linksVagas = [];

  await page.goto(pesquisas);
  await page.setViewport({ width: 1080, height: 1024 });
  await autoScroll(page);

  const mainSection = '#main-content';
  await page.waitForSelector(mainSection);
  const arrayJobsElement = await page.$(mainSection);

  const anchorElement = await arrayJobsElement.$$('a');

  for (const a of anchorElement) {
    const href = await a.evaluate(el => el.getAttribute('href'));

    if (!href.includes("inactive") && href.includes("jobBoardSource=gupy_portal")) {

      const pElement = await a.$('p');
      const h3Element = await a.$('h3');
      const spanElement = await a.$('span[data-testid="job-location"]');
      const imgElement = await a.$('img[alt="Logo da empresa"]');
      let imgSrc = "";

      if (imgElement) {
        imgSrc = ("https://portal.gupy.io/" + await imgElement.evaluate(el => el.getAttribute('src')));
      }

      const company = await pElement.evaluate(el => el.textContent);



      const local = await spanElement.evaluate(el => el.textContent);
      let title = await h3Element.evaluate(el => el.textContent);
      title = title.length > 63 ? title.substring(0, 60) + '...' : title;

      linksVagas.push({ link: href, company: company, local: local, title: title, img: imgSrc });
    }

  }


  console.log("Vagas encontradas: " + linksVagas.length + `- ${pesquisas}`);

  await browser.close();

  return linksVagas;
}


async function mustHaveRequirements(jobsArray) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const jobsRequirements = [];

  console.log("LOG: Buscando requisitos")
  for (let i in jobsArray) {
    try {
      console.log(`${jobsArray[i].link}`)
      await page.goto(`${jobsArray[i].link}`);
      await page.setViewport({ width: 1080, height: 1024 });
      await page.waitForSelector('.sc-add46fb1-1');
      const jobRequisitesSection = await page.$$(".sc-add46fb1-1");
      let datePublished = await page.$(".sc-ccd5d36-11");
      datePublished = await datePublished.evaluate(el => el.textContent);

      for (let j in jobRequisitesSection) {
        const hasH2 = await jobRequisitesSection[j].$('h2[data-testid="section-Requisitos e qualificações-title"]');

        if (hasH2) {

          const mustHaveRequisites = await jobRequisitesSection[j].$(".sc-add46fb1-3");

          const texto = await mustHaveRequisites.evaluate(el => el.textContent.trim());
          jobsRequirements.push(
            { 
              link: jobsArray[i].link, 
              requisitos: texto, company: 
              jobsArray[i].company, 
              local: jobsArray[i].local, 
              title: jobsArray[i].title, 
              modalidade: "", 
              img: jobsArray[i].img, 
              datePublished: datePublished})

        } else {

        }

      }
    } catch (e) {
      console.log("LOG: ERRO AO SEGUIR LINKS DE VAGAS -" + e.message);
    }

  }



  await browser.close();

  return jobsRequirements;
}

function returnJobObject(arrayJobs, modalidade) { 
  let vagasParaInserir = [];
  modalidade = modalidade.charAt(0).toUpperCase() + modalidade.slice(1);

  for(let i in arrayJobs) {
    vagasParaInserir.push({
      id: arrayJobs[i].id,
      title: arrayJobs[i].title,
      company: arrayJobs[i].company,
      local: arrayJobs[i].local,
      description: arrayJobs[i].requisitos,
      link: arrayJobs[i].link,
      modalidade: modalidade,
      img: arrayJobs[i].img,
      datePublished: arrayJobs[i].datePublished
    })
  }

  //console.log(vagasParaInserir) //

  return vagasParaInserir;
}

function dividirArray(array, tamanhoMaximo) {
  if (array.length <= 80) {
      return [array];
  } else {
      const numSubarrays = Math.ceil(array.length / tamanhoMaximo);
      const subarrays = [];
      for (let i = 0; i < numSubarrays; i++) {
          const subarray = array.slice(i * tamanhoMaximo, (i + 1) * tamanhoMaximo);
          subarrays.push(subarray);
      }
      return subarrays;
  }
}






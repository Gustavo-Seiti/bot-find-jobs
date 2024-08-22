// node --version # Should be >= 18
// npm install @google/generative-ai
import dotenv from 'dotenv';
dotenv.config();

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


const MODEL_NAME = "";
const API_KEY = "";


const runChat = async (input) => {
  console.log("LOG: Enviando vagas para GEMINI" + new Date().getTime)
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const systemInstruction = {
    role: 'system',
    parts: [
      {
        text: `Tenho a descrição de várias vagas, eu extrai o texto de algumas paginas de vagas, porém os requisitos obrigatorios e opcionais, estão misturados, preciso dar entrada no texto inteiro e que você retorne pra mim, APENAS requisitos obrigatórios que sejam LINGUAGENS DE PROGRAMAÇÃO, FRAMEWORKS E BANCO DE DADOS.
          Preciso que devolva no formato JSON.` },
    ],
  };


  const chat = model.startChat({
    generationConfig,
    safetySettings,
    systemInstruction,
    history: [
      {
        role: "user",
        parts: [{ text: "O que você precisa ter ou saber?Experiência avançada em programação Node e Java/Kotlin;Experiência na construção APIs RESTful;Experiência com as abordagens: SOLID, Clean Architecture, Clean Code;Experiência na definição e construção de estruturas serverless e tecnologias de contêiner, como: Lambda, Docker, Kubernetes;Experiência na construção de soluções com bancos de dados NoSQL (com MongoDb e DynamoDB) e relacionais (como PostgresQL);Experiência na construção do desenvolvimento em pipelines de CI/CD;Experiência com as ferramentas de CI / CD, como: GitHub Actions, Jenkins, Azure Devops, CircleCI; Experiência com padrões de arquitetura de sistemas distribuídos na nuvem (AWS Cloud);Experiência com uma ampla variedade de produtos AWS e tecnologias de contêiner, como: Docker, Kubernetes, Lambda, Secrets Manager, SQS;Experiência no desenvolvimento de serviços distribuídos orientados a eventos;Experiência de trabalho em uma equipe multifuncional, distribuída e diversificada;Experiencia com testes unitarios e de integração.Será um diferencial se você tiverCrossplaneBackstageConhecimento em GCP" }],
      },
      {
        role: "model",
        parts: [{ text: "```json\n{\n  \"linguagens_de_programação\": [\"Node\", \"Java\", \"Kotlin\"],\n  \"frameworks\": [\"RESTful APIs\"],\n  \"banco_de_dados\": [\"NoSQL (MongoDB, DynamoDB)\", \"PostgresQL\"]\n}\n```" }],
      },
    ],
  });

  const result = await chat.sendMessage(input);
  const response = result.response;
  return response.text();
}

export { runChat };

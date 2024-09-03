# Agreggatech Job Finder Bot 🔎

O **Agreggatech Job Finder Bot** é uma ferramenta inovadora desenvolvida para ajudar desenvolvedores iniciantes a encontrar vagas de emprego de forma rápida e eficiente. Este bot automatiza a busca e a filtragem de oportunidades de trabalho em tecnologia, permitindo que você se concentre no que realmente importa: sua carreira.

## 🚀 Funcionalidades

- **Acesso a Portais de Vagas**: O bot é capaz de acessar múltiplos portais de vagas utilizando as URLs fornecidas, oferecendo uma ampla cobertura do mercado de trabalho.
- **Varredura de Oportunidades**: Realiza uma varredura detalhada em todas as vagas disponíveis nos portais acessados, garantindo que nenhuma oportunidade passe despercebida.
- **Captura de Informações**: Extrai informações cruciais de cada vaga, como descrição, requisitos, localização, e outros detalhes relevantes.
- **Análise com Google Gemini API**: Integração com a API do Google Gemini para análise semântica das vagas, retornando um JSON estruturado com os requisitos da posição.
- **Armazenamento em SQLite**: Todas as informações coletadas são salvas em um banco de dados SQLite, facilitando a consulta e análise posterior.

## 🛠️ Pré-requisitos

Antes de rodar o bot localmente, certifique-se de ter os seguintes itens configurados:

1. **Google AI Studio**: Crie uma conta no [Google AI Studio](https://ai.google.dev/aistudio) e obtenha chaves de API válidas para utilizar o Google Gemini.
2. **Node.js**: Verifique se o Node.js está instalado em seu sistema. O bot foi desenvolvido utilizando Node.js, e você pode baixá-lo [aqui](https://nodejs.org/).
3. **Dependências do Projeto**: Após clonar o repositório, execute `npm install` para instalar todas as dependências necessárias.
4. **SQLite**: O bot utiliza SQLite para armazenamento de dados. Se você ainda não tem o SQLite instalado, siga as instruções [aqui](https://www.sqlite.org/download.html) para instalá-lo.

## 🏃‍♂️ Como usar

Siga as instruções abaixo para configurar e utilizar o bot em seu ambiente local:

1. **Clone o Repositório**: Baixe o código fonte para o seu computador:

    ```bash
    git clone https://github.com/oMaestro174/bot-find-jobs.git
    ```

2. **Instale as Dependências**: Navegue até o diretório do projeto e instale as dependências:

    ```bash
    cd bot-find-jobs
    npm install
    ```

3. **Configure as Chaves de API**: Adicione suas chaves de API do Google AI Studio ao projeto. Isso pode ser feito criando um arquivo `.env` com a variável `GOOGLE_API_KEY`.

4. **Execute o Bot**: Inicie o bot para começar a busca de vagas:

    ```bash
    npm start
    ```

5. **Consulta de Vagas**: As vagas capturadas serão automaticamente armazenadas no banco de dados SQLite, que você pode consultar posteriormente.

## 🤝 Contribuindo

Contribuições são extremamente bem-vindas! Se você encontrar bugs, tiver sugestões de melhorias ou novas funcionalidades, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*. Juntos podemos tornar essa ferramenta ainda mais útil para a comunidade de desenvolvedores.

---

**Nota**: Este projeto está em constante evolução, e suas sugestões e feedback são essenciais para o desenvolvimento contínuo. Se você é um desenvolvedor iniciante ou experiente, participe desta iniciativa e ajude outros a darem o próximo passo em suas carreiras!

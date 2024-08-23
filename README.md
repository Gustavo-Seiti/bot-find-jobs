# Agreggatech Job Finder Bot 🔎

Este é o projeto inicial do bot do Agreggatech, desenvolvido para ajudar desenvolvedores iniciantes a encontrar vagas de emprego. Com essa ferramenta, você pode buscar e filtrar vagas de acordo com os requisitos desejados, economizando tempo e esforço na busca pela sua primeira oportunidade.

## Funcionalidades

- Acessa portais de vagas de acordo com as URLs fornecidas.
- Varre e acessa todas as vagas disponíveis.
- Captura a descrição e outras informações relevantes das vagas.
- Utiliza a API do Google Gemini para "ler" a vaga e retornar um JSON com os requisitos da vaga.
- Salva as informações das vagas em um banco de dados SQLite.

## Pré-requisitos

Para rodar o bot localmente, você precisará de:

1. **Google AI Studio**: Um cadastro no [Google AI Studio](https://ai.google.dev/aistudio) e chaves de API válidas.
2. **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina.
3. **Dependências**: Execute o comando `npm install` para instalar as dependências necessárias.
4. **SQLite**: Instale o [SQLite](https://www.sqlite.org/) para armazenar as informações das vagas.

## Como usar

1. Clone o repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/Gustavo-Seiti/bot-find-jobs.git
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Configure suas chaves de API do Google AI Studio no projeto.

4. Execute o bot para começar a busca de vagas:

    ```bash
    npm start
    ```

5. As vagas capturadas serão armazenadas no banco de dados SQLite.

## Contribuindo

Sinta-se à vontade para modificar o código conforme necessário. Qualquer sugestão, melhoria ou correção de bugs é bem-vinda!

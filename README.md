# To Do List

## Descrição

Este projeto é um sistema de To Do List desenvolvido para gerenciar tarefas pessoais de forma eficiente. O sistema inclui uma tela de login e funcionalidades de CRUD (Criar, Ler, Atualizar e Excluir) para tarefas.

## Funcionalidades

- **Tela de Login**: Permite que os usuários se autentiquem e acessem suas listas de tarefas.
- **CRUD de Tarefas**: Permite a criação, visualização, atualização e exclusão de tarefas.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework React para renderização no lado do servidor e criação de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que adiciona tipagem estática, melhorando a robustez do código.
- **[Jest](https://jestjs.io/)**: Framework de testes para realizar testes unitários e garantir a qualidade do código.
- **[Prisma](https://www.prisma.io/)**: ORM para gerenciar a base de dados e interagir com o banco de dados de forma eficiente.
- **[SQLite](https://www.sqlite.org/)**: Banco de dados leve e fácil de configurar, utilizado para armazenar as tarefas.

## Instalação

Para rodar o projeto localmente, siga os seguintes passos:

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/to-do-list.git](https://github.com/igaaoo/to-do-wevy.git)
   cd to-do-wevy
<br/>

2. **Instale Dependências:**

   ```bash
   yarn install ou npm install

<br/>
3. **Configure as variáveis de ambiente:** <br/>
Criar arquivo .env na raiz do projeto contendo:
 - DATABASE_URL="file:./database/todo.db" # Ou outro caminho para salvar o banco de dados SQLITE
 - NODE_ENV=production # Ou com valor "test" para realizar os testes com JEST

<br/>
4. **Construa e Execute:**
    ```bash
    yarn install ou npm install

<br/>
5. **Para testar o projeto:**
Altere a variável de ambiente NODE_ENV para "test" e após, execute:

 ```bash
yarn test ou npm test

# To Do List

![image](https://github.com/user-attachments/assets/291efc3b-dadb-46ec-bc77-c29303b36da9)

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

## Acesso
Para motivos demonstrativos, já há um usuário cadastrado com algumas tarefas criadas, segue credenciais de login: <br/>
**Usuário:** <br/>
Wevy123 <br/>
**Senha:** <br/>
Senha123 <br/>

## Instalação

Para rodar o projeto localmente, siga os seguintes passos:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/to-do-list.git](https://github.com/igaaoo/to-do-wevy.git)
   cd to-do-wevy
    ```
   
2. **Instale Dependências:**
   ```bash
   yarn install # Ou npm install
    ```

3. **Configure as variáveis de ambiente:** <br/>
Criar arquivo .env na raiz do projeto contendo:<br/>
 - DATABASE_URL="file:./database/todo.db" # Ou outro caminho para salvar o banco de dados SQLITE<br/>
 - NODE_ENV=production # Ou com valor "test" para realizar os testes com JEST

4. **Construa e Execute:**<br/>
    ```bash
    yarn build # Ou npm run build
    yarn start # Ou npm run start
    ```

5. **Para testar o projeto:**<br/>
Altere a variável de ambiente NODE_ENV para "test" e após, execute:

```bash
yarn test # Ou npm run test
```

## Preview
**Tela de Login**
![image](https://github.com/user-attachments/assets/4e93d5f5-4eca-4b83-9f0a-4c8567fd2a4a)

**Tela te Tarefas**
![image](https://github.com/user-attachments/assets/291efc3b-dadb-46ec-bc77-c29303b36da9)


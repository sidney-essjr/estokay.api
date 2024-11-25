# Backend - EstOkay.

### Tecnologias

- Typescript
- NestJS

### Escopo

- Manter de forma segura e escalável toda estrutura de conexão com a base de dados e autenticação, disponibilizando endpoints para integração.

### Endpoints

```
/voluntarios, POST
/voluntarios/:id, GET
/voluntarios/buscar/:email, GET
/voluntarios, GET
/voluntarios/:id, PATCH
/voluntarios/:id/senha, PATCH
/voluntarios/adm/:id, PATCH
/auth/login, POST
/auth/esqueceu-senha, POST
/auth/redefinir-senha, POST
/auth/session-login, POST
/doacoes, POST
/doacoes/buscar-item-por-categoria/:categoria, GET
/doacoes/buscar, GET
/distribuicoes, POST
/distribuicoes/buscar, GET
/estoque/buscar, GET
/estoque/atualizar/:id, POST
```

### Características do Database

- **SGBD**: PostgreSQL
- **Estrutura de armazenamento**: Relacional
- **Hospedagem e Gerenciamento:** [Supabase](https://supabase.com/)
- **Database Schema**
    
    ![image.png](image.png)
    

### Run project

```jsx
git clone https://github.com/sidney-essjr/estokay.api.git
npm install
npm run dev
```

Além dos comandos acima, é necessário adicionar o arquivo .env com as chaves abaixo

```jsx
DB_SECRET=''
DB_HOST=''
DB_PORT=
DB_USERNAME=''
DB_NAME=''

JWT_SECRET=''

EMAIL_USER=''
EMAIL_SECRET=''
```

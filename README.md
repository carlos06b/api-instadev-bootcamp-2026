# api-instadev

API REST inspirada no Instagram, desenvolvida durante a formação **Programador Backend Node.js: API REST, Autenticação**. Permite cadastro e autenticação de usuários, criação de posts com upload de imagem, curtidas e edição de perfil.

## Tecnologias

- Node.js / Express
- MySQL + Sequelize (ORM e migrations)
- JWT para autenticação
- Bcrypt.js para hash de senha
- Multer + Backblaze B2 para upload de imagens
- JSON Schema para validação de payloads
- ESLint (Airbnb base)

## Requisitos

- Node.js
- MySQL

## Instalação

```bash
git clone https://github.com/carlos06b/api-instadev-bootcamp-2026.git
cd api-instadev
yarn install
```

Copie o `.env.example` para `.env` e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `PORT` | Porta em que o servidor vai rodar |
| `DIALECT` | Dialeto do banco (mysql) |
| `HOST` | Host do banco de dados |
| `DB_USERNAME` | Usuário do banco |
| `PASSWORD` | Senha do banco |
| `DATABASE` | Nome do banco de dados |
| `DB_PORT` | Porta do banco de dados |
| `HASH_BCRYPIT` | Chave secreta usada para assinar o JWT |
| `EXPIRE_IN` | Tempo de expiração do token JWT |
| `SECRET_CRYPTO` | Chave usada para criptografar o id do usuário no token |
| `APPLICATION_KEY_ID` | Key ID da conta Backblaze B2 |
| `APPLICATION_KEY` | Application Key da conta Backblaze B2 |
| `BUCKET_ID` | ID do bucket no Backblaze B2 |
| `BASE_URL_BACKBLAZE` | URL base pública do bucket, usada para montar o link da imagem |

Crie o banco e rode as migrations:

```bash
npx sequelize db:create
npx sequelize db:migrate
```

Inicie o servidor:

```bash
yarn start
```

## Endpoints

### Autenticação

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth` | Login (por `email` ou `user_name` + `password`) | Não |

### Usuário

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/user` | Cria um usuário | Não |
| GET | `/user` | Retorna o perfil do usuário logado | Sim |
| PUT | `/user` | Atualiza dados do usuário (nome, avatar, bio, gênero, senha) | Sim |
| DELETE | `/user` | Remove o usuário logado | Sim |

### Upload

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/upload` | Faz upload de uma imagem (campo `image`) para o Backblaze B2 | Sim |

### Posts

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/posts` | Cria um post | Sim |
| PUT | `/posts/:id` | Atualiza um post | Sim |
| DELETE | `/posts/:id` | Remove um post | Sim |
| GET | `/posts/all-posts` | Lista todos os posts | Sim |
| GET | `/posts/my-posts` | Lista os posts do usuário logado | Sim |
| PUT | `/posts/add-like/:id` | Curte um post (um usuário não pode curtir o mesmo post duas vezes) | Sim |

Rotas com `Auth: Sim` exigem o header `Authorization: Bearer <token>` obtido em `/auth`.

## Health check

```
GET /health
```

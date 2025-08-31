# App

GymPass style app.

## RFs (Requitos funcionais)

-   [X] Deve ser possível se cadastrar;
-   [X] Deve ser possível se autenticar;
-   [X] Deve ser possível obter o perfil de um usuário logado;
-   [X] Deve ser possível obter quantidade de check-ins realizados pelo usuário logado;
-   [X] Deve ser possível que o usuário obtenha seu histórico de check-ins;
-   [x] Deve ser possível que o usuário busque academias próximas, até 10km;
-   [X] Deve ser possível que o usuário busque academia pelo nome;
-   [X] Deve ser possível que o usuário faça check-in em uma academia;
-   [X] Deve ser possível validar o check-in de um usuário;
-   [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

-   [X] O usuário não pode se cadastrar com um e-mail duplicado;
-   [X] O usuário não pode fazer check-ins no mesmo dia;
-   [X] O usuário não pode fazer check-in se não estiver a menos de 100mts da academia;
-   [X] O check-in só pode ser validado até 20 minutos após criado;
-   [ ] O check-in só pode ser validade por administradores;
-   [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

-   [X] A senha do usuária necessitam estar criptografada;
-   [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
-   [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
-   [ ] O usuário deve ser identificado por um token JWT

## Criando projeto

Inicializando projeto

-   npm init -y

Criar o arquivo .npmrc na pasta raiz para fixar versões

```bash
save-exact=true
```

Instalando dependencias

-   npm i typescript @types/node tsx tsup -D

Inicializando typescript

-   npx tsc -init

Ajustar a versão do node no tsconfig.json
"target": "es2020",

Instalar o Fastify

-   npm install fastify

Criar a pasta src

-   mkdir src

Criar o arquivo app.ts na pasta src

```bash
import fastify from "fastify";

export const app = fastify();
```

Criar o arquivo server.ts na pasta src

```bash
import { app } from "./app";

app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("🚀 HTTP Server running!");
});
```

Configurar o arquivo package.json

```bash
{
  "name": "03-api-solid",
  "version": "1.0.0",
  "description": "GymPass style app.",
  "main": "index.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "node build/server.js",
    "build": "tsup src --out-dir build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^24.3.0",
    "tsup": "^8.5.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  },
  "dependencies": {
    "fastify": "^5.5.0"
  }
}
```

## Configurando o ambiente

Instalar as bibliotecas dotenv e zod

-   npm install dotenv zod

Criar o arquivo .env.example na raiz

```bash
NODE_ENV=dev
```

Criar o arquivo .env na raiz e inserir no .gitignore

```bash
NODE_ENV=dev
```

Criar subpasta env na pasta src

```bash
mkdir src/env
```

Criar o arquivo index.ts na env

```bash
import "dotenv/config"
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("❌ Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables.")
}


export const env = _env.data
```

Atualizar o arquivo server.ts na

```bash
import { app } from "./app";
import { env } from "./env";

app.listen({
  port: env.PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log("🚀 HTTP Server running!");
});
```

## Configurando o ESLint

Instalar as bibliotecas

-   npm install eslint --save-dev

Gerar o arquivo de configuração

-   npx eslint --init

√ What do you want to lint? · javascript, json, md, css
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ Which language do you want your configuration file be written in? · ts
√ What flavor of Markdown do you want to lint? · commonmark
Jiti is required for Node.js <24.3.0 to read TypeScript configuration files.
√ Would you like to add Jiti as a devDependency? · No / Yes
The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint, @eslint/json, @eslint/markdown, @eslint/css
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm

Configurar o arquivo eslint.config.mts

```bash
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  tseslint.configs.recommended,
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/commonmark", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
```

Configurar o arquivo .eslintigmore

```bash
node_modules
dist
build
.env
.env.*
```

Configurar o arquivo tsconfig.json

```bash
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "es2020",
    "types": [],

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
```

Criar um alias no arquivo `tsconfig.json`

```bash
// Modules
"baseUrl": "./",
"paths": {
  "@/*": ["./src/*"]
},
```

---

## Instalando Prisma

Instalar a extensão do Prisma no editor

```txt
Adds syntax highlighting, formatting, auto-completion, jump-to-definition and linting for .prisma files.
```

Instalar bibliotecas para desenvolvimento

```bash
npm install prisma --save-dev
```

Instalar bibliotecas para produção

```bash
npm install @prisma/client
```

Inicializar o Prismas

```bash
npx prisma init
```

Configurar a auto formação
Ctrl + Shift + P
Preferences Open User Settings(JSON)

```bash
"[prisma]": {
  "editor.formatOnSave": true
}
```

---

## Configurando banco de dados

Comandos Docker

Criar um container

```bash
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

Iniciar um container

```bash
docker start id
ou
docker start name
```

Listar todos containers que estão rodando

```bash
docker ps
```

Ver logs container

```bash
docker logs name
```

Seguir logs container

```bash
docker logs name -f
```

Listar todos containers criados

```bash
docker ps -a
```

Parar um container

```bash
docker stop id
ou
docker stop name
```

Matar um container

```bash
docker down id
ou
docker down name
```

Configurar o arquivo .env

```bash
NODE_ENV=dev

DATABASE_URL="postgres://docker:docker@localhost:5432/apisolid?schema=public"
```

Gerar migração

```bash
npx prisma generate
```

Aplicar migração

```bash
npx prisma migrate dev
```

? Enter a name for the new migration: »
create users table

Verificar migração

```bash
npx prisma studio
```

Criar o arquivo docker-compose.yml

```sh
version: '3'

services:
  db:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: apisolid
```

Criar ou iniciar o container

```sh
docker compose up -d
```

Parar o container

```sh
docker compose stop
```

Apagar o container

```sh
docker compose down
```

Criando relacionamentos

```sh
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  @@map("users")
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password_hash  String
  created_at DateTime @default(now())
  checkIns CheckIn[]
}

model CheckIn {
  @@map("check_ins")
  id        String   @id @default(uuid())
  gym_id     String
  user_id    String
  validate_at DateTime?
  created_at DateTime @default(now())
  user User @relation(fields: [user_id], references: [id])
  gym Gym @relation(fields: [gym_id], references: [id])
}

model Gym {
  @@map("gyms")
  id        String   @id @default(uuid())
  name      String
  description String?
  phone     String?
  latitude  Decimal
  longitude Decimal
  created_at DateTime @default(now())
  checkIns CheckIn[]
}
```

---

## Criando a rota para registro de usuário

Criar a uma pasta libs na raiz do projeto

```sh
import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
```

Atualizar o arquivo app.ts

```sh
import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./libs/prisma.ts";

export const app = fastify();

app.post('/users', async (request, reply) => {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()

})
```

Atualizar o arquivo tsconfig.json

```sh
    // Modules
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"],
      "@/env": ["./src/env/index.ts"],
    },
```

## Instalar o bcryptjs

```sh
npm install bcryptjs
```

```sh
npm install @types/bcryptjs --save-dev
```
## Instalando e configurando o Vitest

Instalar dependências
```sh
npm install vitest vite-tsconfig-paths --save-dev
```

Configurar o vite.config.ts
```sh
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
});
```

Inserir os scripts de test no package.json
```sh
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
},
```


## Configurando a cobertura de testes com Vitest
```sh
npm install @vitest/coverage-v8
```

## Instalando Vitest UI
```sh
npm install @vitest/ui
```

## Instalando pacote DayJS
```sh
npm install dayjs
```
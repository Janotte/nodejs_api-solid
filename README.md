# App

GymPass style app.

## RFs (Requitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter quantidade de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível que o usuário obtenha seu histórico de check-ins;
- [ ] Deve ser possível que o usuário busque academias próximas;
- [ ] Deve ser possível que o usuário busque academia pelo nome;
- [ ] Deve ser possível que o usuário faça check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver a menos de 100mts da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validade por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [ ] A senha do usuária necessitam estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um token JWT

## Criando projeto
Inicializando projeto
- npm init -y

Criar o arquivo .npmrc na pasta raiz para fixar versões
```bash
save-exact=true
```

Instalando dependencias
- npm i typescript @types/node tsx tsup -D

Inicializando typescript
- npx tsc -init

Ajustar a versão do node no tsconfig.json
"target": "es2020",

Instalar o Fastify
- npm install fastify

Criar a pasta src
- mkdir src

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
- npm install dotenv zod

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
- npm install eslint --save-dev

Gerar o arquivo de configuração
- npx eslint --init

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

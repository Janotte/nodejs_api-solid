# 🏋️ GymPass API

Uma API completa para gerenciamento de academias e check-ins, construída com Node.js, TypeScript e Fastify, seguindo os princípios de Clean Architecture e SOLID.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso da API](#uso-da-api)
- [Testes](#testes)
- [Documentação](#documentação)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Esta API simula um sistema similar ao GymPass, permitindo que usuários se registrem, encontrem academias próximas, façam check-ins e gerenciem suas atividades físicas. O projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento, incluindo Clean Architecture, SOLID principles e documentação completa.

### 🎨 Características Principais

- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **SOLID Principles** - Código maintível e extensível
- ✅ **TypeScript** - Tipagem estática e IntelliSense
- ✅ **Documentação JSDoc** - Código auto-documentado
- ✅ **Testes Completos** - Unit e E2E tests
- ✅ **Validação Robusta** - DTOs com Zod
- ✅ **Autenticação JWT** - Sistema seguro de autenticação
- ✅ **Logging Estruturado** - Logs organizados e informativos

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **Zod** - Validação de schemas

### Desenvolvimento
- **Vitest** - Framework de testes
- **Supertest** - Testes de integração HTTP
- **ESLint** - Linter para qualidade de código
- **Docker** - Containerização

## 🚀 Funcionalidades

### 👤 Gestão de Usuários
- **Registro** - Criação de contas com validação
- **Autenticação** - Login com JWT
- **Perfil** - Visualização e atualização de dados
- **Refresh Token** - Renovação automática de tokens

### 🏋️ Gestão de Academias
- **Criação** - Cadastro de novas academias (Admin)
- **Busca** - Pesquisa por nome com paginação
- **Proximidade** - Encontrar academias próximas por coordenadas

### 📍 Sistema de Check-ins
- **Check-in** - Registro de presença na academia
- **Validação** - Aprovação de check-ins (Admin)
- **Histórico** - Visualização de check-ins anteriores
- **Métricas** - Estatísticas de frequência

### 🔐 Controle de Acesso
- **Roles** - Sistema de permissões (MEMBER/ADMIN)
- **Middleware** - Proteção de rotas sensíveis
- **Validação** - Verificação de distância e tempo

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação clara de responsabilidades:

```
src/
├── use-cases/          # Lógica de negócio
│   ├── register.ts     # Registro de usuários
│   ├── authenticate.ts # Autenticação
│   ├── check-in.ts     # Check-ins
│   └── errors/         # Classes de erro customizadas
├── repositories/       # Camada de dados
│   ├── prisma/         # Implementação Prisma
│   └── in-memory/      # Implementação para testes
├── http/               # Camada HTTP
│   ├── controllers/    # Handlers de requisições
│   ├── middlewares/    # Middlewares de autenticação
│   └── dtos/           # Validação de dados
├── lib/                # Utilitários
│   ├── logger.ts       # Sistema de logging
│   └── prisma.ts       # Cliente Prisma
├── config/             # Configurações
│   └── constants.ts    # Constantes da aplicação
└── utils/              # Funções auxiliares
```

### 🎯 Princípios SOLID Aplicados

- **S** - Single Responsibility: Cada classe tem uma responsabilidade
- **O** - Open/Closed: Extensível sem modificação
- **L** - Liskov Substitution: Interfaces bem definidas
- **I** - Interface Segregation: Interfaces específicas
- **D** - Dependency Inversion: Dependências abstraídas

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- Docker (opcional)

### 1. Clone o repositório
```bash
git clone <repository-url>
cd 03-api-solid
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
# Com Docker
docker-compose up -d

# Ou configure manualmente o PostgreSQL
```

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
NODE_ENV=development
PORT=3333
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL="postgresql://username:password@localhost:5432/gympass"
```

### 5. Execute as migrações
```bash
npx prisma migrate dev
```

### 6. Inicie o servidor
```bash
npm run dev
```

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `3333` |
| `JWT_SECRET` | Chave secreta para JWT | - |
| `DATABASE_URL` | URL de conexão do banco | - |

### Constantes da Aplicação

As constantes estão centralizadas em `src/config/constants.ts`:

```typescript
export const AUTH_CONFIG = {
  JWT_EXPIRES_IN: "10m",
  REFRESH_TOKEN_EXPIRES_IN: "1d",
  PASSWORD_HASH_ROUNDS: 6,
};

export const BUSINESS_RULES = {
  MAX_DISTANCE_IN_KILOMETERS: 0.1,
  MIN_PASSWORD_LENGTH: 6,
  MAX_CHECK_IN_VALIDATION_MINUTES: 20,
};
```

## 🌐 Uso da API

### Autenticação

A API usa JWT para autenticação. Inclua o token no header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Endpoints Principais

#### 👤 Usuários

```bash
# Registro
POST /users
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}

# Login
POST /sessions
{
  "email": "joao@example.com",
  "password": "123456"
}

# Perfil
GET /me

# Refresh Token
POST /token/refresh
```

#### 🏋️ Academias

```bash
# Criar academia (Admin)
POST /gyms
{
  "title": "Academia Fit",
  "description": "A melhor academia da cidade",
  "phone": "(11) 99999-9999",
  "latitude": -23.5505,
  "longitude": -46.6333
}

# Buscar academias
GET /gyms/search?query=fit&page=1

# Academias próximas
GET /gyms/nearby?latitude=-23.5505&longitude=-46.6333
```

#### 📍 Check-ins

```bash
# Fazer check-in
POST /gyms/:gymId/check-ins
{
  "latitude": -23.5505,
  "longitude": -46.6333
}

# Histórico
GET /check-ins/history?page=1

# Métricas
GET /check-ins/metrics

# Validar check-in (Admin)
PATCH /check-ins/:checkInId/validate
```

### 📊 Códigos de Status

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Dados inválidos |
| `401` | Não autorizado |
| `404` | Recurso não encontrado |
| `409` | Conflito (ex: email já existe) |

### ⚠️ Tratamento de Erros

A API retorna erros estruturados:

```json
{
  "message": "E-mail already exists.",
  "statusCode": 409,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/users"
}
```

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Todos os testes
npm run test:all

# Cobertura de testes
npm run test:coverage
```

### Estrutura dos Testes

- **Unit Tests**: Testam casos de uso isoladamente
- **E2E Tests**: Testam fluxos completos da API
- **Mocks**: Repositórios in-memory para testes unitários

### Exemplo de Teste

```typescript
describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
```

## 📚 Documentação

### JSDoc

Todo o código está documentado com JSDoc:

```typescript
/**
 * Use case for registering new users
 * 
 * @param request - Registration request data
 * @returns Promise resolving to the created user data
 * @throws {UserAlreadyExistsError} When email is already registered
 * 
 * @example
 * ```typescript
 * const result = await registerUseCase.execute({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "securePassword123"
 * });
 * ```
 */
```

### Documentação Técnica

- [API Documentation](./src/docs/api-documentation.md)
- [Naming Conventions](./src/docs/naming-conventions.md)

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar em produção
npm run test         # Testes unitários
npm run test:e2e     # Testes E2E
npm run lint         # Verificar código
npm run lint:fix     # Corrigir problemas de lint
```

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga as convenções de nomenclatura definidas
- Escreva testes para novas funcionalidades
- Mantenha a cobertura de testes acima de 80%
- Documente com JSDoc
- Use TypeScript strict mode

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
test: adiciona ou corrige testes
refactor: refatora código sem mudar funcionalidade
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Desenvolvedor** - [Sandro André Janotte](https://github.com/seuusuario)

## 🙏 Agradecimentos

- [Rocketseat](https://rocketseat.com.br/) - Pela excelente trilha de Node.js
- [Fastify](https://www.fastify.io/) - Framework incrível
- [Prisma](https://www.prisma.io/) - ORM moderno e poderoso
- Comunidade TypeScript - Pela linguagem fantástica

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

</div>

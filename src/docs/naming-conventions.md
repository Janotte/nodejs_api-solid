# Naming Conventions Guide

Este documento define as convenções de nomenclatura utilizadas no projeto para garantir consistência e legibilidade do código.

## 📁 **Estrutura de Arquivos e Diretórios**

### Diretórios
- **kebab-case**: `user-profile`, `check-ins`, `use-cases`
- **Plural para coleções**: `users`, `gyms`, `check-ins`
- **Singular para utilitários**: `utils`, `lib`, `config`

### Arquivos
- **kebab-case**: `user-repository.ts`, `check-in-use-case.ts`
- **Sufixos descritivos**:
  - `.dto.ts` - Data Transfer Objects
  - `.repository.ts` - Repository implementations
  - `.use-case.ts` - Use cases
  - `.controller.ts` - HTTP controllers
  - `.middleware.ts` - Middleware functions
  - `.error.ts` - Custom error classes
  - `.spec.ts` - Test files

## 🏗️ **Classes e Interfaces**

### Classes
- **PascalCase**: `UserRepository`, `CheckInUseCase`, `RegisterUserDTO`
- **Sufixos descritivos**:
  - `UseCase` - Use cases
  - `Repository` - Repositories
  - `DTO` - Data Transfer Objects
  - `Error` - Custom errors
  - `Controller` - HTTP controllers

### Interfaces
- **PascalCase**: `UserRepository`, `CheckInRequest`, `UserResponse`
- **Prefixo "I" opcional**: `IUserRepository` (não usado no projeto)

## 🔧 **Variáveis e Funções**

### Variáveis
- **camelCase**: `userRepository`, `checkInData`, `isValid`
- **Constantes**: `UPPER_SNAKE_CASE`: `MAX_DISTANCE`, `JWT_SECRET`

### Funções
- **camelCase**: `createUser`, `validateCheckIn`, `parseRequest`
- **Verbos descritivos**: `get`, `create`, `update`, `delete`, `validate`, `parse`

### Parâmetros de Função
- **camelCase**: `userId`, `checkInData`, `requestBody`

## 📊 **Tipos e Enums**

### Types/Interfaces
- **PascalCase**: `UserRequest`, `CheckInResponse`, `GymData`
- **Sufixos descritivos**:
  - `Request` - Dados de entrada
  - `Response` - Dados de saída
  - `Data` - Dados internos
  - `Config` - Configurações

### Enums
- **PascalCase**: `UserRole`, `CheckInStatus`
- **Valores**: `UPPER_SNAKE_CASE`: `ADMIN`, `MEMBER`, `PENDING`

## 🗄️ **Banco de Dados**

### Tabelas
- **snake_case**: `users`, `check_ins`, `gym_memberships`

### Colunas
- **snake_case**: `user_id`, `created_at`, `password_hash`

### Relacionamentos
- **snake_case**: `user_id`, `gym_id`, `check_in_id`

## 🌐 **API Endpoints**

### URLs
- **kebab-case**: `/user-profile`, `/check-ins`, `/gym-memberships`
- **Plural para recursos**: `/users`, `/gyms`, `/check-ins`

### Métodos HTTP
- **Verbos descritivos**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

## 🧪 **Testes**

### Arquivos de Teste
- **kebab-case**: `user-repository.spec.ts`, `check-in-use-case.spec.ts`

### Funções de Teste
- **camelCase**: `shouldCreateUser`, `shouldValidateCheckIn`
- **Padrão**: `should[Action][ExpectedResult]`

### Variáveis de Teste
- **camelCase**: `userRepository`, `checkInData`, `expectedResult`

## 📝 **Exemplos de Aplicação**

### ✅ **Correto**
```typescript
// Classes
class UserRepository {}
class CheckInUseCase {}
class RegisterUserDTO {}

// Variáveis
const userRepository = new UserRepository();
const checkInData = { userId: "123", gymId: "456" };
const isValid = true;

// Funções
function createUser(userData: UserRequest): Promise<UserResponse> {}
function validateCheckIn(checkInId: string): boolean {}

// Constantes
const MAX_DISTANCE_IN_KILOMETERS = 0.1;
const JWT_SECRET = "secret";
```

### ❌ **Incorreto**
```typescript
// Classes
class userRepository {} // deveria ser UserRepository
class CheckInUseCase {} // correto
class registerUserDTO {} // deveria ser RegisterUserDTO

// Variáveis
const UserRepository = new UserRepository(); // deveria ser userRepository
const check_in_data = {}; // deveria ser checkInData
const IsValid = true; // deveria ser isValid

// Funções
function CreateUser() {} // deveria ser createUser
function validate_check_in() {} // deveria ser validateCheckIn
```

## 🎯 **Regras Específicas do Projeto**

1. **Use Cases**: Sempre terminam com `UseCase`
2. **Repositories**: Sempre terminam com `Repository`
3. **DTOs**: Sempre terminam com `DTO`
4. **Errors**: Sempre terminam com `Error`
5. **Controllers**: Sempre terminam com `Controller`
6. **Middlewares**: Sempre terminam com `Middleware`
7. **Factories**: Sempre começam com `make`
8. **Constants**: Sempre em `UPPER_SNAKE_CASE`
9. **Enums**: Sempre em `PascalCase`
10. **Interfaces**: Sempre em `PascalCase`

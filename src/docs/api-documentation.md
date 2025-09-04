# API Documentation

This document provides comprehensive documentation for the GymPass-style API built with Node.js, TypeScript, and Fastify.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Use Cases](#use-cases)
- [Repositories](#repositories)
- [DTOs](#dtos)
- [Controllers](#controllers)
- [Middlewares](#middlewares)
- [Error Handling](#error-handling)
- [Configuration](#configuration)
- [Testing](#testing)

## 🏗️ Architecture Overview

The application follows Clean Architecture principles with clear separation of concerns:

```
src/
├── use-cases/          # Business logic
├── repositories/       # Data access layer
├── http/              # HTTP layer
│   ├── controllers/   # Request handlers
│   ├── middlewares/   # Request processing
│   └── dtos/         # Data validation
├── lib/               # Utilities and services
├── config/            # Configuration constants
└── utils/             # Helper functions
```

## 🎯 Use Cases

### User Management

#### RegisterUseCase
Creates new user accounts with email validation and password hashing.

**Request:**
```typescript
{
  name: string;
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  user: {
    id: string;
    name: string;
    email: string;
    password_hash: string;
  };
}
```

**Errors:**
- `UserAlreadyExistsError` - Email already registered

#### AuthenticateUseCase
Authenticates users by validating email and password.

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  user: User;
}
```

**Errors:**
- `InvalidCredentialsError` - Invalid email or password

### Gym Management

#### CreateGymUseCase
Creates new gym locations with coordinate validation.

#### SearchGymsUseCase
Searches gyms by name with pagination support.

#### FetchNearbyGymsUseCase
Finds gyms within a specified distance from user location.

### Check-in Management

#### CheckInUseCase
Creates user check-ins with distance and time validation.

**Business Rules:**
- User must be within 100m of gym
- Only one check-in per day allowed
- Gym must exist

#### ValidateCheckInUseCase
Validates check-ins within 20 minutes of creation.

## 🗄️ Repositories

### UsersRepository
Interface for user data operations:
- `create(data)` - Create new user
- `findByEmail(email)` - Find user by email
- `findById(id)` - Find user by ID

### GymsRepository
Interface for gym data operations:
- `create(data)` - Create new gym
- `findById(id)` - Find gym by ID
- `searchMany(query, page)` - Search gyms by name
- `findManyNearby(params)` - Find nearby gyms

### CheckInsRepository
Interface for check-in data operations:
- `create(data)` - Create new check-in
- `findById(id)` - Find check-in by ID
- `findByUserIdOnDate(userId, date)` - Find user's check-in for date
- `findManyByUserId(userId, page)` - Get user's check-in history
- `countByUserId(userId)` - Count user's total check-ins

## 📝 DTOs (Data Transfer Objects)

### BaseDTO
Abstract base class providing common validation patterns:
- `parse(data)` - Validate and parse data
- `safeParse(data)` - Safe validation without throwing
- `getSchema()` - Get raw Zod schema

### User DTOs
- `RegisterUserDTO` - User registration validation
- `AuthenticateUserDTO` - User authentication validation
- `UpdateUserProfileDTO` - Profile update validation
- `UserIdDTO` - User ID parameter validation

### Gym DTOs
- `CreateGymDTO` - Gym creation validation
- `SearchGymsDTO` - Gym search validation
- `FetchNearbyGymsDTO` - Nearby gyms validation
- `GymIdDTO` - Gym ID parameter validation

### Check-in DTOs
- `CreateCheckInDTO` - Check-in creation validation
- `CheckInIdDTO` - Check-in ID parameter validation
- `CheckInGymIdDTO` - Gym ID in check-in context
- `CheckInsHistoryDTO` - Check-in history validation

## 🌐 Controllers

### User Controllers
- `POST /users` - Register new user
- `POST /sessions` - Authenticate user
- `GET /me` - Get user profile
- `POST /token/refresh` - Refresh JWT token

### Gym Controllers
- `POST /gyms` - Create new gym (Admin only)
- `GET /gyms/search` - Search gyms
- `GET /gyms/nearby` - Find nearby gyms

### Check-in Controllers
- `POST /gyms/:gymId/check-ins` - Create check-in
- `GET /check-ins/history` - Get check-in history
- `GET /check-ins/metrics` - Get check-in metrics
- `PATCH /check-ins/:checkInId/validate` - Validate check-in (Admin only)

## 🛡️ Middlewares

### verifyJWT
Validates JWT tokens from Authorization header.

### verifyUserRole
Validates user roles for admin-only endpoints.

### errorHandler
Global error handler providing consistent error responses.

## ⚠️ Error Handling

### Custom Errors
- `UserAlreadyExistsError` - Email already registered
- `InvalidCredentialsError` - Invalid login credentials
- `ResourceNotFoundError` - Resource not found
- `MaxDistanceError` - User too far from gym
- `MaxNumberOfCheckInsError` - Daily check-in limit reached
- `LateCheckInValidationError` - Check-in validation too late

### Error Response Format
```typescript
{
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  issues?: any; // For validation errors
}
```

## ⚙️ Configuration

### Constants
All configuration values are centralized in `src/config/constants.ts`:

```typescript
export const AUTH_CONFIG = {
  JWT_EXPIRES_IN: "10m",
  REFRESH_TOKEN_EXPIRES_IN: "1d",
  PASSWORD_HASH_ROUNDS: 6,
  COOKIE_CONFIG: { /* ... */ }
};

export const BUSINESS_RULES = {
  MAX_DISTANCE_IN_KILOMETERS: 0.1,
  MIN_PASSWORD_LENGTH: 6,
  MAX_CHECK_IN_VALIDATION_MINUTES: 20,
  COORDINATE_BOUNDS: { /* ... */ }
};
```

### Environment Variables
- `NODE_ENV` - Environment (dev/test/prod)
- `PORT` - Server port (default: 3333)
- `JWT_SECRET` - JWT signing secret

## 🧪 Testing

### Unit Tests
Located in `src/use-cases/*.spec.ts`:
- Test business logic in isolation
- Use in-memory repositories
- Cover all use cases and error scenarios

### E2E Tests
Located in `src/http/controllers/*.spec.ts`:
- Test complete request/response cycle
- Use real database (Prisma)
- Cover all API endpoints

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# All tests with coverage
npm run test:coverage
```

## 📚 Additional Resources

- [Naming Conventions Guide](./naming-conventions.md)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [Prisma Documentation](https://www.prisma.io/docs/)

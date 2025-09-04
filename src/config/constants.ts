/**
 * Application constants and configuration values
 * Centralizes magic numbers and hardcoded values
 */

// Authentication & Security
export const AUTH_CONFIG = {
  JWT_EXPIRES_IN: "10m",
  REFRESH_TOKEN_EXPIRES_IN: "1d",
  PASSWORD_HASH_ROUNDS: 6,
  COOKIE_CONFIG: {
    PATH: "/",
    SECURE: true,
    SAME_SITE: true,
    HTTP_ONLY: true,
  },
} as const;

// Business Rules
export const BUSINESS_RULES = {
  MAX_DISTANCE_IN_KILOMETERS: 0.1,
  MIN_PASSWORD_LENGTH: 6,
  MAX_CHECK_IN_VALIDATION_MINUTES: 20,
  COORDINATE_BOUNDS: {
    LATITUDE: {
      MIN: -90,
      MAX: 90,
    },
    LONGITUDE: {
      MIN: -180,
      MAX: 180,
    },
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

// Environment
export const ENVIRONMENT = {
  DEV: "dev",
  TEST: "test",
  PROD: "prod",
} as const;

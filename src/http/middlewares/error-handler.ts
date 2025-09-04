import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { logger } from "@/lib/logger.ts";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error.ts";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.ts";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { MaxDistanceError } from "@/use-cases/errors/max-distance-error.ts";
import { MaxNumberOfCheckInsError } from "@/use-cases/errors/max-number-of-check-ins-error.ts";
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-validation-error.ts";

/**
 * Error response interface for consistent error formatting
 */
interface ErrorResponse {
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  issues?: Record<string, unknown>;
}

/**
 * Maps application errors to HTTP status codes
 */
const ERROR_STATUS_MAP = {
  [UserAlreadyExistsError.name]: 409,
  [InvalidCredentialsError.name]: 401,
  [ResourceNotFoundError.name]: 404,
  [MaxDistanceError.name]: 400,
  [MaxNumberOfCheckInsError.name]: 400,
  [LateCheckInValidationError.name]: 400,
} as const;

/**
 * Global error handler middleware
 * Centralizes error handling and provides consistent error responses
 */
export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const timestamp = new Date().toISOString();
  const path = request.url;

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorResponse: ErrorResponse = {
      message: "Validation error",
      statusCode: 400,
      timestamp,
      path,
      issues: error.format(),
    };

    return reply.status(400).send(errorResponse);
  }

  // Handle known application errors
  const errorName = error.constructor.name;
  const statusCode = ERROR_STATUS_MAP[errorName as keyof typeof ERROR_STATUS_MAP];

  if (statusCode) {
    const errorResponse: ErrorResponse = {
      message: error.message,
      statusCode,
      timestamp,
      path,
    };

    return reply.status(statusCode).send(errorResponse);
  }

  // Handle unknown errors
  const errorResponse: ErrorResponse = {
    message: "Internal server error",
    statusCode: 500,
    timestamp,
    path,
  };

  // Log error details
  logger.error("Unhandled error occurred", {
    url: request.url,
    method: request.method,
    userAgent: request.headers["user-agent"],
    ip: request.ip,
  }, error);

  return reply.status(500).send(errorResponse);
}

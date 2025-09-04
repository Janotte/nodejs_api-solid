import { env } from "@/env";
import { ENVIRONMENT } from "@/config/constants.ts";

/**
 * Log levels for structured logging
 * 
 * Defines the available log levels in order of severity:
 * - ERROR: Critical errors that require immediate attention
 * - WARN: Warning messages for potential issues
 * - INFO: General information about application flow
 * - DEBUG: Detailed debugging information (only in development)
 */
export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

/**
 * Log entry interface for consistent logging format
 * 
 * Defines the structure of log entries to ensure consistent
 * logging across the application.
 */
interface LogEntry {
  /** Log level indicating severity */
  level: LogLevel;
  /** Human-readable log message */
  message: string;
  /** ISO timestamp of when the log was created */
  timestamp: string;
  /** Additional context data (optional) */
  context?: Record<string, unknown>;
  /** Error details (optional, only for error logs) */
  error?: {
    /** Error class name */
    name: string;
    /** Error message */
    message: string;
    /** Error stack trace (only in development) */
    stack?: string;
  };
}

/**
 * Structured logger class
 * 
 * Provides consistent, structured logging across the application.
 * Automatically formats logs as JSON and handles different environments
 * (development, production, test).
 * 
 * @example
 * ```typescript
 * import { logger } from "@/lib/logger";
 * 
 * logger.info("User logged in", { userId: "123", email: "user@example.com" });
 * logger.error("Database connection failed", { error: connectionError });
 * logger.debug("Processing request", { requestId: "req-123" });
 * ```
 */
class Logger {
  private isDevelopment = env.NODE_ENV === ENVIRONMENT.DEV;
  private isTest = env.NODE_ENV === ENVIRONMENT.TEST;

  /**
   * Logs an error message
   */
  error(message: string, context?: Record<string, unknown>, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Logs a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Logs an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Logs a debug message (only in development)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  /**
   * Core logging method
   */
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    // Skip logging in test environment
    if (this.isTest) {
      return;
    }

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          ...(this.isDevelopment && { stack: error.stack }),
        },
      }),
    };

    // Use console methods for different log levels
    switch (level) {
      case LogLevel.ERROR:
        console.error(JSON.stringify(logEntry, null, this.isDevelopment ? 2 : 0));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(logEntry, null, this.isDevelopment ? 2 : 0));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(logEntry, null, this.isDevelopment ? 2 : 0));
        break;
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(logEntry, null, this.isDevelopment ? 2 : 0));
        break;
    }
  }
}

// Export singleton instance
export const logger = new Logger();

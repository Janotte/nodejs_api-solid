import { z } from "zod";

/**
 * Base DTO class that provides common validation patterns
 * 
 * All DTOs should extend this class for consistency and to ensure
 * uniform validation behavior across the application.
 * 
 * @template T - The Zod schema type for this DTO
 * 
 * @example
 * ```typescript
 * class UserDTO extends BaseDTO<z.ZodType<UserRequest>> {
 *   constructor() {
 *     const schema = z.object({
 *       name: z.string(),
 *       email: z.string().email()
 *     });
 *     super(schema);
 *   }
 * }
 * ```
 */
export abstract class BaseDTO<T extends z.ZodTypeAny> {
  /** The Zod schema used for validation */
  protected schema: T;

  /**
   * Creates a new BaseDTO instance
   * @param schema - The Zod schema for validation
   */
  constructor(schema: T) {
    this.schema = schema;
  }

  /**
   * Validates and parses data according to the schema
   * 
   * @param data - The data to validate and parse
   * @returns Parsed and validated data
   * @throws {z.ZodError} If validation fails
   * 
   * @example
   * ```typescript
   * const userDTO = new UserDTO();
   * try {
   *   const user = userDTO.parse({ name: "John", email: "john@example.com" });
   *   console.log(user.name); // "John"
   * } catch (error) {
   *   console.log("Validation failed:", error.errors);
   * }
   * ```
   */
  parse(data: unknown): z.infer<T> {
    return this.schema.parse(data);
  }

  /**
   * Safely validates data without throwing errors
   * 
   * @param data - The data to validate
   * @returns Validation result with success flag and data/error
   * 
   * @example
   * ```typescript
   * const userDTO = new UserDTO();
   * const result = userDTO.safeParse({ name: "John", email: "invalid-email" });
   * 
   * if (result.success) {
   *   console.log("Valid data:", result.data);
   * } else {
   *   console.log("Validation errors:", result.error.errors);
   * }
   * ```
   */
  safeParse(data: unknown): z.ZodSafeParseSuccess<z.infer<T>> | z.ZodSafeParseError<unknown> {
    return this.schema.safeParse(data);
  }

  /**
   * Gets the raw Zod schema for advanced usage
   * 
   * @returns The Zod schema instance
   * 
   * @example
   * ```typescript
   * const userDTO = new UserDTO();
   * const schema = userDTO.getSchema();
   * // Use schema for custom validation logic
   * ```
   */
  getSchema(): T {
    return this.schema;
  }
}

/**
 * Common validation patterns used across DTOs
 */
export const CommonValidations = {
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  id: z.string().uuid("Invalid ID format"),
  coordinate: {
    latitude: z.coerce.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    longitude: z.coerce.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  },
} as const;

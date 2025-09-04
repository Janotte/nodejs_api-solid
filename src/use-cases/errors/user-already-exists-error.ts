/**
 * Error thrown when attempting to register a user with an email that already exists
 * 
 * This error is thrown by the RegisterUseCase when a user tries to register
 * with an email address that is already associated with an existing account.
 * 
 * @example
 * ```typescript
 * try {
 *   await registerUseCase.execute({ email: "existing@example.com", ... });
 * } catch (error) {
 *   if (error instanceof UserAlreadyExistsError) {
 *     console.log("Email already registered");
 *   }
 * }
 * ```
 */
export class UserAlreadyExistsError extends Error {
  /**
   * Creates a new UserAlreadyExistsError instance
   */
  constructor() {
    super("E-mail already exists.");
    this.name = "UserAlreadyExistsError";
  }
}
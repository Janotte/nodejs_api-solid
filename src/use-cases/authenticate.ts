import type { UsersRepository } from "@/repositories/users-repository.ts";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";
import type { User } from "@prisma/client";

/**
 * Request interface for user authentication
 */
interface AuthenticateUseCaseRequest {
  /** User's email address */
  email: string;
  /** User's plain text password */
  password: string;
}

/**
 * Response interface for user authentication
 */
interface AuthenticateUseCaseResponse {
  /** Authenticated user object */
  user: User;
}

/**
 * Use case for authenticating users
 * 
 * This use case handles user authentication by:
 * - Finding user by email
 * - Comparing provided password with stored hash
 * - Returning user data if credentials are valid
 * 
 * @example
 * ```typescript
 * const authenticateUseCase = new AuthenticateUseCase(usersRepository);
 * const result = await authenticateUseCase.execute({
 *   email: "user@example.com",
 *   password: "userPassword123"
 * });
 * ```
 */
export class AuthenticateUseCase {
  /**
   * Creates a new AuthenticateUseCase instance
   * @param usersRepository - Repository for user data operations
   */
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Executes the user authentication process
   * 
   * @param request - Authentication request data
   * @returns Promise resolving to the authenticated user data
   * @throws {InvalidCredentialsError} When email or password is invalid
   * 
   * @example
   * ```typescript
   * try {
   *   const result = await authenticateUseCase.execute({
   *     email: "john@example.com",
   *     password: "securePassword123"
   *   });
   *   console.log(`User ${result.user.name} authenticated successfully`);
   * } catch (error) {
   *   console.log("Authentication failed");
   * }
   * ```
   */
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

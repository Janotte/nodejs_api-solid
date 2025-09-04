import { hash } from "bcryptjs";
import type { UsersRepository } from "@/repositories/users-repository.ts";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error.ts";
import { AUTH_CONFIG } from "@/config/constants.ts";

/**
 * Request interface for user registration
 */
interface RegisterUseCaseRequest {
  /** User's full name */
  name: string;
  /** User's email address (must be unique) */
  email: string;
  /** User's password (will be hashed) */
  password: string;
}

/**
 * Response interface for user registration
 */
interface RegisterUseCaseResponse {
  /** Created user object */
  user: {
    /** Unique user identifier */
    id: string;
    /** User's full name */
    name: string;
    /** User's email address */
    email: string;
    /** Hashed password */
    password_hash: string;
  };
}

/**
 * Use case for registering new users
 * 
 * This use case handles the complete user registration process:
 * - Validates email uniqueness
 * - Hashes the password
 * - Creates the user in the repository
 * 
 * @example
 * ```typescript
 * const registerUseCase = new RegisterUseCase(usersRepository);
 * const result = await registerUseCase.execute({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "securePassword123"
 * });
 * ```
 */
export class RegisterUseCase {
  /**
   * Creates a new RegisterUseCase instance
   * @param usersRepository - Repository for user data operations
   */
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Executes the user registration process
   * 
   * @param request - Registration request data
   * @returns Promise resolving to the created user data
   * @throws {UserAlreadyExistsError} When email is already registered
   * 
   * @example
   * ```typescript
   * const result = await registerUseCase.execute({
   *   name: "Jane Doe",
   *   email: "jane@example.com",
   *   password: "myPassword123"
   * });
   * console.log(result.user.id); // "user-123"
   * ```
   */
  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, AUTH_CONFIG.PASSWORD_HASH_ROUNDS);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}

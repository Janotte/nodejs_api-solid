import type { Prisma, User } from "@prisma/client";

/**
 * Repository interface for user data operations
 * 
 * This interface defines the contract for user data access,
 * allowing different implementations (Prisma, In-Memory, etc.)
 * while maintaining consistent behavior.
 */
export interface UsersRepository {
  /**
   * Creates a new user in the repository
   * @param data - User creation data
   * @returns Promise resolving to the created user
   * @throws Error if user creation fails
   */
  create(data: Prisma.UserCreateInput): Promise<User>;

  /**
   * Finds a user by their email address
   * @param email - User's email address
   * @returns Promise resolving to the user or null if not found
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Finds a user by their unique identifier
   * @param id - User's unique identifier
   * @returns Promise resolving to the user or null if not found
   */
  findById(id: string): Promise<User | null>;
}

import type { Gym, Prisma } from "@prisma/client";

/**
 * Parameters for fetching nearby gyms
 */
export interface FetchNearbyParams {
  /** User's current latitude coordinate */
  userLatitude: number;
  /** User's current longitude coordinate */
  userLongitude: number;
}

/**
 * Repository interface for gym data operations
 * 
 * This interface defines the contract for gym data access,
 * allowing different implementations (Prisma, In-Memory, etc.)
 * while maintaining consistent behavior.
 */
export interface GymsRepository {
  /**
   * Creates a new gym in the repository
   * @param data - Gym creation data
   * @returns Promise resolving to the created gym
   * @throws Error if gym creation fails
   */
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  /**
   * Finds a gym by its unique identifier
   * @param id - Gym's unique identifier
   * @returns Promise resolving to the gym or null if not found
   */
  findById(id: string): Promise<Gym | null>;

  /**
   * Searches gyms by name with pagination
   * @param query - Search query string
   * @param page - Page number for pagination (1-based)
   * @returns Promise resolving to array of matching gyms
   */
  searchMany(query: string, page: number): Promise<Gym[]>;

  /**
   * Finds gyms near a specific location
   * @param params - Location parameters for nearby search
   * @returns Promise resolving to array of nearby gyms
   */
  findManyNearby(params: FetchNearbyParams): Promise<Gym[]>;
}

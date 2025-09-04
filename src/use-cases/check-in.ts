import type { CheckInsRepository } from "@/repositories/check-ins-repository.ts";
import type { CheckIn } from "@prisma/client";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.ts";
import type { GymsRepository } from "@/repositories/gyms-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.ts";
import { MaxDistanceError } from "./errors/max-distance-error.ts";
import { BUSINESS_RULES } from "@/config/constants.ts";

/**
 * Request interface for check-in creation
 */
interface CheckInUseCaseRequest {
  /** ID of the user performing the check-in */
  userId: string;
  /** ID of the gym where check-in is being performed */
  gymId: string;
  /** User's current latitude coordinate */
  userLatitude: number;
  /** User's current longitude coordinate */
  userLongitude: number;
}

/**
 * Response interface for check-in creation
 */
interface CheckInUseCaseResponse {
  /** Created check-in object */
  checkIn: CheckIn;
}

/**
 * Use case for creating user check-ins
 * 
 * This use case handles the complete check-in process:
 * - Validates gym existence
 * - Checks distance between user and gym
 * - Ensures user hasn't already checked in today
 * - Creates the check-in record
 * 
 * @example
 * ```typescript
 * const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);
 * const result = await checkInUseCase.execute({
 *   userId: "user-123",
 *   gymId: "gym-456",
 *   userLatitude: -23.5505,
 *   userLongitude: -46.6333
 * });
 * ```
 */
export class CheckInUseCase {
  /**
   * Creates a new CheckInUseCase instance
   * @param checkInsRepository - Repository for check-in data operations
   * @param gymsRepository - Repository for gym data operations
   */
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  /**
   * Executes the check-in creation process
   * 
   * @param request - Check-in request data
   * @returns Promise resolving to the created check-in data
   * @throws {ResourceNotFoundError} When gym doesn't exist
   * @throws {MaxDistanceError} When user is too far from gym
   * @throws {MaxNumberOfCheckInsError} When user already checked in today
   * 
   * @example
   * ```typescript
   * try {
   *   const result = await checkInUseCase.execute({
   *     userId: "user-123",
   *     gymId: "gym-456",
   *     userLatitude: -23.5505,
   *     userLongitude: -46.6333
   *   });
   *   console.log(`Check-in created: ${result.checkIn.id}`);
   * } catch (error) {
   *   if (error instanceof MaxDistanceError) {
   *     console.log("Too far from gym");
   *   }
   * }
   * ```
   */
  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
      { latitude: userLatitude, longitude: userLongitude }
    );

    if (distance > BUSINESS_RULES.MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}

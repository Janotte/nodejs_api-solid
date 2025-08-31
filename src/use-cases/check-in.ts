import type { CheckInsRepository } from "@/repositories/check-ins-repository.ts";
import type { CheckIn } from "@prisma/client";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.ts";
import type { GymsRepository } from "@/repositories/gyms-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.ts";
import { MaxDistanceError } from "./errors/max-distance-error.ts";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

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

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
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

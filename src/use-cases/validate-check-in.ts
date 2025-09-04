import type { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { LateCheckInValidationError } from "./errors/late-check-validation-error.ts";
import { BUSINESS_RULES } from "@/config/constants.ts";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const differenceInMinutes = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (differenceInMinutes > BUSINESS_RULES.MAX_CHECK_IN_VALIDATION_MINUTES) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

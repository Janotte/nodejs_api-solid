import { beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in.ts";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { LateCheckInValidationError } from "./errors/late-check-validation-error.ts";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  it("should be able to validate a check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
      validated_at: null,
      created_at: new Date(),
    });

    await sut.execute({ checkInId: createdCheckIn.id });

    const checkIn = await checkInsRepository.findById(createdCheckIn.id);

    expect(checkIn?.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check in", async () => {
    await expect(
      sut.execute({ checkInId: "inexistent-check-in-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
      validated_at: null,
      created_at: new Date(),
    });

    const twentyMinutesInMs = 21 * 60 * 1000;
    vi.advanceTimersByTime(twentyMinutesInMs);

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});

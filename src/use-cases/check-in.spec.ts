import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in.ts";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.ts";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.ts";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error.ts";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckInUseCase", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-1",
      name: "Gym 1",
      description: "Gym 1",
      phone: "1234567890",
      latitude: -26.2530701,
      longitude: -48.8498027,
      created_at: new Date(),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -26.2530701,
      userLongitude: -48.8498027,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 7, 30, 8, 0, 0));
    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -26.2530701,
      userLongitude: -48.8498027,
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -26.2530701,
        userLongitude: -48.8498027,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2025, 7, 30, 8, 0, 0));
    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -26.2530701,
      userLongitude: -48.8498027,
    });

    vi.setSystemTime(new Date(2025, 7, 31, 8, 0, 0));
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -26.2530701,
      userLongitude: -48.8498027,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on a distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      name: "Gym 2",
      description: "Gym 2",
      phone: "1234567890",
      latitude: new Decimal(-26.2765222),
      longitude: new Decimal(-48.8347859),
      created_at: new Date(),
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-2",
        userLatitude: -26.2530701,
        userLongitude: -48.8498027,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

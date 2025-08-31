import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { CreateGymUseCase } from "./create-gym.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository();
  sut = new CreateGymUseCase(gymsRepository);
});

describe("Create Gym Use Case", () => {
  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      name: "Gym 1",
      description: "Gym 1 Description",
      phone: "(12) 3456-7890",
      latitude: -23.567890,
      longitude: -46.567890,
    });

    expect(gym.id).toEqual(expect.any(String));

  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymUseCase;

describe("FetchNearby Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "OVJ Fit Academia",
      description: "Mais saude, cuidando do seu corpo e mente.",
      phone: "047996106938",
      latitude: -26.3588623,
      longitude: -48.8150488,
    });

    await gymsRepository.create({
      name: "Uplay Garten Joinville",
      description: "Crie o seu estilo de vida",
      phone: "04730439436",
      latitude: -26.2537935,
      longitude: -48.8572018,
    });

    const { gyms } = await sut.execute({
      userLatitude: -26.2548164,
      userLongitude: -48.848594,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Uplay Garten Joinville" }),
    ]);
  });
});

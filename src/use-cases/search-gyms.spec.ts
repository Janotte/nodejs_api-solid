import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { SearchGymsUseCase } from "./search-gyms.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("SearchGyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      name: "Academia SmartFit - Saguaçu",
      description: "Mais saude, cuidando do seu corpo e mente.",
      phone: "1234567890",
      latitude: -26.27734,
      longitude: -48.8522755,
    });

    await gymsRepository.create({
      name: "Uplay Garten Joinville",
      description: "Crie o seu estilo de vida",
      phone: "04730439436",
      latitude: -26.2537935,
      longitude: -48.8572018,
    });

    const { gyms } = await sut.execute({
      query: "SmartFit",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Academia SmartFit - Saguaçu" }),
    ]);
  });

  it("should be able to search for gyms by pagination", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Gym-${i}`,
        description: "Mais saude, cuidando do seu corpo e mente.",
        phone: "1234567890",
        latitude: -26.27734 + i,
        longitude: -48.8522755 + i,
      });
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Gym-21" }),
        expect.objectContaining({ name: "Gym-22" }),
      ])
    );
  });
});

import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.ts";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}

import { CreateGymUseCase } from "../create-gym.ts";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository.ts";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}

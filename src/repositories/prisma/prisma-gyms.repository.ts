import { prisma } from "@/libs/prisma.ts";
import type { Gym, Prisma } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository.ts";

export class PrismaGymsRepository implements GymsRepository {
  
  findById(id: string): Promise<Gym | null> {
    throw new Error("Method not implemented.");
  }
  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });
    return gym;
  }
}

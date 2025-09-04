import { prisma } from "@/lib/prisma.ts";
import type { Gym, Prisma } from "@prisma/client";
import type { FetchNearbyParams, GymsRepository } from "../gyms-repository.ts";

export class PrismaGymsRepository implements GymsRepository {
  async findManyNearby(params: FetchNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE (6371 * acos(cos(radians(${params.userLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${params.userLongitude})) + sin(radians(${params.userLatitude})) * sin(radians(latitude)))) <= 10
    `;

    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym || null;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }
}

import { Prisma, type Gym } from "@prisma/client";
import type { FetchNearbyParams, GymsRepository } from "../gyms-repository.ts";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.ts";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findManyNearby(params: FetchNearbyParams): Promise<Gym[]> {
    return this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude: params.userLatitude, longitude: params.userLongitude },
          { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
        );
        return distance < 10;
      });
  }



  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id) || null;

    if (!gym) {
      return null;
    }

    return gym;
  }
}



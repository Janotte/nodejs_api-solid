import { Prisma, type Gym } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository.ts";
import { randomUUID } from "node:crypto";

class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ??  randomUUID(),
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

export { InMemoryGymsRepository };
import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository.ts";

class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id) || null;

    if (!gym) {
      return null;
    }

    return gym;
  }
}

export { InMemoryGymsRepository };
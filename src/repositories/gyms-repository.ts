import type { Gym, Prisma } from "@prisma/client";

export interface FetchNearbyParams {
  userLatitude: number;
  userLongitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FetchNearbyParams): Promise<Gym[]>;
}

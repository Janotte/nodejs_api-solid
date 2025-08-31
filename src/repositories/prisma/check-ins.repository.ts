
import { prisma } from "@/libs/prisma.ts";
import type { CheckIn, Prisma } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository.ts";

export class PrismaCheckInsRepository implements CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}

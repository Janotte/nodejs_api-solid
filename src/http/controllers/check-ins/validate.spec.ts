import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";
import { prisma } from "@/libs/prisma.ts";

describe("Validate Check-In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: ({
        name: "Blue Fit Gym",
        description: "The best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      }),
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    const updatedCheckIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(updatedCheckIn.validated_at).toEqual(expect.any(Date));
  });
});

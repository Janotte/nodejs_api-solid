import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";
import { prisma } from "@/libs/prisma.ts";

describe("History Check-In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get check-in history", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        name: "Blue Fit Gym",
        description: "The best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ]);
  });
});

import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";
import { prisma } from "@/lib/prisma.ts";

describe("Create Check-In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const gym = await prisma.gym.create({
      data: ({
        name: "Blue Fit Gym",
        description: "The best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      }),
    });

    const createCheckInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.0747279,
        longitude: -49.5161571,
      });

    expect(createCheckInResponse.statusCode).toEqual(201);
  });
});

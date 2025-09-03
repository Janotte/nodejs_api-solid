import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createGymResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Blue Fit Gym",
        description: "The best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      });

    expect(createGymResponse.statusCode).toEqual(201);
  });
});

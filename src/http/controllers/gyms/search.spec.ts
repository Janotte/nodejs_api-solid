import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Blue Fit Gym",
        description: "The best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Red Fit Gym",
        description: "The second best gym in the world",
        phone: "(99) 99999-9999",
        latitude: -27.0747279,
        longitude: -49.5161571,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        query: "Blue Fit Gym",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "Blue Fit Gym",
      }),
    ]);
  });
});

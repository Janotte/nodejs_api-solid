import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app.ts";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user.ts";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "OVJ Fit Academia",
        description: "Mais saude, cuidando do seu corpo e mente.",
        phone: "047996106938",
        latitude: -26.3588623,
        longitude: -48.8150488,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Uplay Garten Joinville",
        description: "Crie o seu estilo de vida",
        phone: "04730439436",
        latitude: -26.2537935,
        longitude: -48.8572018,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .set("Authorization", `Bearer ${token}`)
      .query({
        latitude: -26.2548164,
        longitude: -48.848594,
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: "Uplay Garten Joinville" }),
    ]);
  });
});
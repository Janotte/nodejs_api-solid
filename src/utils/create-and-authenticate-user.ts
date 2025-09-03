import request from "supertest";
import type { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123456",
  });

  const authenticateResponse = await request(app.server)
    .post("/sessions")
    .send({
      email: "john.doe@example.com",
      password: "123456",
    });

  const { token } = authenticateResponse.body;

  return { token };
}

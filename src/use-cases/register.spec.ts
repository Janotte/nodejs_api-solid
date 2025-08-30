import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.ts";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.ts";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.ts";

let usersRepository: InMemoryUsersRepository;
let sut:RegisterUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository();
  sut = new RegisterUseCase(usersRepository);
});

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "john.doe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register a new user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
    expect(user.email).toEqual("john.doe@example.com");
    expect(user.password_hash).toEqual(expect.any(String));
  });
});

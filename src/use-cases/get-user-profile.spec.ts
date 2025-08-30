import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user: userProfile } = await sut.execute({
      userId: createdUser.id,
    });

    expect(userProfile.id).toEqual(expect.any(String));
    expect(userProfile.name).toEqual("John Doe");
    expect(userProfile.email).toEqual("john.doe@example.com");
  });

  it("should not be able to get user profile with wrong user id", async () => {
    await expect(
      sut.execute({ userId: "non-existing-user-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

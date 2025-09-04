import { Prisma, type User } from "@prisma/client";
import type { UsersRepository } from "../users-repository.ts";  

export class InMemoryUsersRepository implements UsersRepository {
    private users: User[] = [];

    async findByEmail(email: string) {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
            role: data.role || "MEMBER",
        };

        this.users.push(user);

        return user;
    }

    async findById(id: string) {
        const user = this.users.find((user) => user.id === id);
        return user || null;
    }
}




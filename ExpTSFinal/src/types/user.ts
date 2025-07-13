import { User } from "../generated/prisma";

export type CreateUserDTO = Pick<User, "fullname" | "email" | "password" | "majorId">

export type UpdateUserDto = Pick<User, "fullname" | "email" | "majorId">;

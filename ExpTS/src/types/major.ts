import { Major } from "../generated/prisma";

export type CreateMajorDTO = Pick<Major, "code" | "name" | "description">
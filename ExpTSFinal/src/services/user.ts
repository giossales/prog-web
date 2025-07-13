import { PrismaClient, User } from "../generated/prisma";
import { CreateUserDTO, UpdateUserDto } from "../types/user";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<Omit<User, 'password'>[]> => {
    return await prisma.user.findMany({
        select: {
            id: true,
            fullname: true,
            email: true,
            majorId: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            major: true,
        },
    });

    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return null;
};

export const createUser = async (user: CreateUserDTO): Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return await prisma.user.create({
        data: {
            ...user,
            password: hashedPassword,
        }
    });
}

export const removeUser = async (id: string): Promise<User | null> => {
    return await prisma.user.delete({ where: { id } });
}

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data: data,
    });
};

export const changePasswordService = async (id: string, currentPass: string, newPass: string): Promise<boolean> => {

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPass, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Senha atual incorreta.");
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPass, salt);

    await prisma.user.update({
        where: { id },
        data: { password: newHashedPassword },
    });

    return true;
};
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const checkCredentials = async (email: string, password: string): Promise<any | null> => {
    const user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        return user;
    }

    return null;
}
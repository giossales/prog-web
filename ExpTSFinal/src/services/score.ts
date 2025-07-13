import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const saveScore = async (userId: string, score: number) => {
	return prisma.gameSession.create({
		data: {
			userId: userId,
			score: score,
		},
	});
};
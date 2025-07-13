import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getTopTenRanking = async () => {
    const topScores = await prisma.gameSession.groupBy({
        by: ['userId'],
        _max: {
            score: true,
        },
        orderBy: {
            _max: {
                score: 'desc',
            },
        },
        take: 10,
    });

    const userIds = topScores.map(s => s.userId);
    const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, fullname: true },
    });

    const ranking = topScores.map(scoreEntry => {
        const user = users.find(u => u.id === scoreEntry.userId);
        return {
            fullname: user ? user.fullname : 'Usuário Desconhecido',
            maxScore: scoreEntry._max.score ?? 0,
        };
    });

    return ranking;
};
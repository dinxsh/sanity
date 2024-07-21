import { PrismaClient } from '@prisma/client';
import dbConnect from '../../../lib/dbConnect';

const prisma = new PrismaClient();

export async function GET(req, res) {
    await dbConnect();

    try {
        const gameData = await prisma.games.findMany();
        const existingGames = [];

        for (const game of gameData) {
            const existingGame = await prisma.games.findUnique({
                where: { name: game.name },
            });
            existingGames.push(existingGame);
        }

        res.status(200).json(existingGames);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

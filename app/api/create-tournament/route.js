import { PrismaClient } from '@prisma/client';
import dbConnect from '../../../lib/dbConnect';

const prisma = new PrismaClient();

export async function POST(req, res) {
    {
        const { tournamentName, selectedPlatform, participantType, selectedTimezone, size } = req.body;

        try {
            await dbConnect();

            const existingTournament = await prisma.tournament.findFirst({
                where: { tournamentName },
            });

            if (existingTournament) {
                return res.status(409).json({ message: 'Tournament already exists' });
            }

            const newTournament = await prisma.tournament.create({
                data: {
                    tournamentName,
                    platform: selectedPlatform,
                    participantType,
                    timezone: selectedTimezone,
                    size: parseInt(size, 10),
                },
            });

            res.status(200).json({ message: 'Tournament created successfully', tournament: newTournament });
        } catch (error) {
            console.error('Error creating tournament:', error);
            res.status(500).json({ message: 'An error occurred while creating the tournament' });
        } finally {
            await prisma.$disconnect();
        }
    }
}

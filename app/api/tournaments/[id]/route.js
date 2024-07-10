import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const tournament = await prisma.tournament.findUnique({
            where: { id },
            include: {
                game: true,
                organizer: true,
            },
        });

        if (tournament) {
            return NextResponse.json(tournament);
        } else {
            return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching tournament:', error);
        return NextResponse.json({ error: 'Error fetching tournament' }, { status: 500 });
    }
}
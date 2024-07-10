import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function GET(request, { params }) {
    const id = params.id;

    try {
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
        return NextResponse.json({ error: 'Error fetching tournament' }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { tournamentId, participantName } = body;
        
        const newParticipant = await prisma.participant.create({
            data: {
                name: participantName,
                tournamentId,
            }
        });

        return NextResponse.json({ message: "Participant added successfully", participant: newParticipant });
    } catch (error) {
        console.error("Error adding participant:", error);
        return NextResponse.json({ message: "An error occurred while adding the participant" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

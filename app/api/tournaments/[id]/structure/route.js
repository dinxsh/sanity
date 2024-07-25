import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST(request, { params }) {
    const id = params.id; // Extract the tournament ID from params
    const { structureData } = await request.json(); // Correctly parse the request body

    try {
        const updatedTournament = await prisma.tournament.update({
            where: { id: id }, // Use the correct ID parameter
            data: { structure: structureData },
        });

        return NextResponse.json({
            message: "Tournament structure updated successfully",
            tournament: updatedTournament,
        });
    } catch (error) {
        console.error("Error updating tournament structure", error);
        return NextResponse.json({
            message: "An error occurred while updating the tournament structure",
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

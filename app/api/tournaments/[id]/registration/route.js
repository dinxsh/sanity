import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function POST(request, {params}){
    
    const id = params.id;

    const {registrationData } =request.body
    
    try {
        const updatedTournament = await prisma.tournament.update({
            where: {id},
            data:  {registrations: registrationData}
        });

        return NextResponse.status(200).json({message: "Registration updated successfully", tournament: updatedTournament});

    } catch (error) {
        console.log(("error while updating tournament", error))
        return NextResponse.status(500).json({message: "Error while updating the registration"})
    }
    finally{
        await prisma.$disconnect();
    }
}
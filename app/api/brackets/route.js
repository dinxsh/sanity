
import dbConnect from '../../../lib/dbConnect';
import Bracket from '../../../model/Bracket';
import { NextResponse } from 'next/server';
import Tournament from '../../../model/Tournament';
import { z } from 'zod';

const bracketSchema = z.object({
    tournament_name: z.string().min(1),
    format: z.enum(['single_elimination', 'double_elimination']),
    consolationFinal: z.boolean().default(false),
    grandFinalType: z.enum(['simple', 'double']),
    teams: z.array(z.string().min(1)).min(4, "At least 4 teams are required")
})

export async function POST(request) {
  try {
    await dbConnect();

    const { tournamentId, bracketName, bracketImage, bracketData } =
      await request.json();

    const newBracket = new Bracket({
      tournamentId,
      bracketName,
      bracketImage,
      bracketData,
    });

    await newBracket.save();

    // Update the tournament with the new bracket
    await Tournament.findByIdAndUpdate(tournamentId, {
      $push: { brackets: newBracket._id },
    });

    return NextResponse.json(
      {
        message: "Bracket created and associated with tournament successfully",
        id: newBracket._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating bracket:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const brackets = await Bracket.find({}).sort({ createdAt: -1 });
    return NextResponse.json(brackets);
  } catch (error) {
    console.error("Error fetching brackets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

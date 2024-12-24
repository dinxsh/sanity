import dbConnect from "../../../lib/dbConnect";
import Bracket from "../../../model/Bracket";
import { NextResponse } from "next/server";
import Tournament from "../../../model/Tournament";
import { z } from "zod";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";

const bracketSchema = z.object({
  tournament_name: z.string().min(1),
  format: z.enum(["single_elimination", "double_elimination"]),
  consolationFinal: z.boolean().default(false),
  grandFinalType: z.enum(["simple", "double"]),
  teams: z.array(z.string().min(1)).min(4, "At least 4 teams are required"),
});

export async function POST(request) {
  const storage = new InMemoryDatabase();
  const manager = new BracketsManager(storage);

  try {
    await dbConnect();
    const body = await request.json();

    const validation = bracketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    console.log(validation.data);

    const { tournament_name, format, consolationFinal, grandFinalType, teams } =
      validation.data;

    const tournamentId = crypto.randomUUID();

    await manager.create.stage({
      tournamentId,
      name: tournament_name,
      type: format,
      seeding: teams,
      settings: {
        consolationFinal,
        grandFinal: grandFinalType,
      },
    });

    const newBracket = new Bracket({
      ...(await manager.get.tournamentData(tournamentId)),
      tournamentName: tournament_name,
      format: format,
    });

    await newBracket.save();

    // cleanup
    await manager.delete.tournament(tournamentId);

    return NextResponse.json(
      { message: "Bracket created successfully", id: newBracket._id },
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

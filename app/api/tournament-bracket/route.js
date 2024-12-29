import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../model/Tournament";
import Bracket from "../../../model/Bracket";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { StageType } from "brackets-model";

export async function POST(request) {
  const { tournament_id } = await request.json();
  const storage = new InMemoryDatabase();
  const manager = new BracketsManager(storage);

  try {
    await dbConnect();
    const tournament = await Tournament.findById(tournament_id);
    if (!tournament) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );
    }

    await manager.create.stage({
      tournamentId: tournament_id,
      name: tournament.tournamentName,
      type: tournament.tournamentFormat,
      seeding: tournament.teamsRegistered.map((team) => {
        return { id: team.id, name: team.name, tournament_id };
      }),
    });

    console.log(await manager.get.tournamentData(tournament_id));

    const newBracket = await Bracket({
      ...(await manager.get.tournamentData(tournament_id)),
      tournamentName: tournament.tournamentName,
      format: tournament.tournamentFormat,
    });

    await newBracket.save();

    // cleanup
    await manager.delete.tournament(tournament_id);

    return NextResponse.json(
      { message: "Bracket created successfully", id: newBracket._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /tournament-bracket:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

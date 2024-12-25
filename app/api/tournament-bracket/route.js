import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../model/Tournament";
import Bracket from "../../../model/Bracket";

export async function POST(request) {
  const { tournament_id } = await request.json();

  try {
    await dbConnect();
    const tournament = await Tournament.findById(tournament_id);

    await manager.create.stage({
      tournament_id,
      name: tournament.tournamentName,
      type: tournamentFormat,
      seeding: tournament.teamsRegistered.map((team) => {
        return { id: team.id, name: team.name, tournament_id };
      }),
    });

    const newBracket = await Bracket({
      ...(await manager.get.tournamentData(tournament_id)),
      tournamentName: tournament.tournamentName,
      format: format,
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

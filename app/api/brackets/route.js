import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Bracket from "../../../model/Bracket";
import { TeamModel } from "../../../model/Team";
import { NextResponse } from "next/server";
import Tournament from "../../../model/Tournament";
import { z } from "zod";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";

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
    console.log("Body:", body);
    const validation = bracketSchema.safeParse(body);
    console.log("Validation:", validation);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { tournament_name, format, consolationFinal, grandFinalType, teams } =
      validation.data;
    console.log(teams);
    const tournamentId = new mongoose.Types.ObjectId();

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

    const participants = teams.map((team, index) => ({
      id: new mongoose.Types.ObjectId(),
      name: team,
      tournament_id: tournamentId,
    }));

    const newBracket = new Bracket({
      ...(await manager.get.tournamentData(tournamentId)),
      tournamentName: tournament_name,
      participant: participants,
      format: format,
    });
    console.log("newBracket:", newBracket);

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
        error: "Error creating bracket",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 },
      );
    }

    const userId = session.user._id; // Extract user ID from session
    const userTeams = await TeamModel.find({ players: userId });

    if (!userTeams.length) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: [],
          message: "No teams found for this user",
        }),
        { status: 200 },
      );
    }

    const teamIds = userTeams.map((team) => team._id);

    const tournaments = await Tournament.find({
      "teamsRegistered.id": { $in: teamIds },
    });

    const tournamentNames = tournaments.map((t) => t.tournamentName);

    const brackets = await Bracket.find({
      tournamentName: { $in: tournamentNames },
    }).sort({ createdAt: -1 });

    const responseBrackets = Array.isArray(brackets) ? brackets : [];

    return NextResponse.json(responseBrackets, { status: 200 });
  } catch (error) {
    console.error("Error fetching brackets:", error);
    return new NextResponse(
      JSON.stringify({
        success: true,
        data: [],
        message: "Error fetching brackets",
      }),
      { status: 500 },
    );
  }
}

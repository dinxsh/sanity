import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Tournament from "../../../../model/Tournament";
import Games from "../../../../model/Games";
import Organizer from "../../../../model/Organizer";

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const id = params.id;

    // Ensure all models are registered
    Games;
    Organizer;

    const tournament = await Tournament.findById(id)
      .select(
        "tournamentName tournamentDates gameType prize slots registeredNumber gameId organizerId",
      )
      .populate("gameId", "name gameBannerPhoto")
      .populate("organizerId", "orgName bannerPhoto")
      .lean();

    if (tournament) {
      return NextResponse.json(tournament);
    } else {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json(
      { error: "Error fetching tournament", details: error.message },
      { status: 500 },
    );
  }
}

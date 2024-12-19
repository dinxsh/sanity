import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../model/Tournament";

export async function POST(req) {
  try {
    await dbConnect();

    const {
      tournamentName,
      selectedPlatform,
      participantType,
      selectedTimezone,
      size,
    } = await req.json();

    const existingTournament = await Tournament.findOne({ tournamentName });

    if (existingTournament) {
      return NextResponse.json(
        { message: "Tournament already exists" },
        { status: 409 },
      );
    }

    const newTournament = new Tournament({
      tournamentName,
      platform: selectedPlatform,
      participantType,
      timezone: selectedTimezone,
      size: parseInt(size, 10),
    });

    await newTournament.save();

    return NextResponse.json(
      { message: "Tournament created successfully", tournament: newTournament },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the tournament" },
      { status: 500 },
    );
  }
}

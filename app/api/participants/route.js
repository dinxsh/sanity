import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/User";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { tournamentId, participantName, userId } = body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.eventsRegistered.push(tournamentId);

    await user.save();

    return NextResponse.json({
      message: "Participant added successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the participant" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Tournament from "../../../../../model/Tournament";
import mongoose from "mongoose";

async function handler(request, { params }) {
  await dbConnect();

  const id = params.id;

  try {
    const { name, members, email, selectedPlatform, participantType } =
      await request.json();

    if (!name || !members || !email || !selectedPlatform || !participantType) {
      return NextResponse.json(
        { message: "All fields are required for registration" },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(members) ||
      members.some((member) => typeof member !== "string")
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid members format. Members must be an array of strings.",
        },
        { status: 400 },
      );
    }

    const teamRegistration = {
      id: new mongoose.Types.ObjectId(),
      name,
      members,
      email,
      selectedPlatform,
      participantType,
    };

    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      { $push: { teamsRegistered: teamRegistration } },
      { new: true },
    );

    if (!updatedTournament) {
      return NextResponse.json(
        { message: "Tournament not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Registration successful",
      teamRegistration,
    });
  } catch (error) {
    console.error("Error while registering for the tournament:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 },
    );
  }
}

export { handler as POST };

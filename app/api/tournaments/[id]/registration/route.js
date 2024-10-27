import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Tournament from "../../../../../model/Tournament";

async function handler(request, { params }) {
  await dbConnect();

  const id = params.id;
  const { registrationData } = await request.json();

  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      { registrations: registrationData },
      { new: true }
    );

    if (!updatedTournament) {
      return NextResponse.status(404).json({ message: "Tournament not found" });
    }

    return NextResponse.status(200).json({
      message: "Registration updated successfully",
      tournament: updatedTournament,
    });
  } catch (error) {
    console.error("Error while updating tournament", error);
    return NextResponse.status(500).json({
      message: "Error while updating the registration",
    });
  }
}

export { handler as POST };

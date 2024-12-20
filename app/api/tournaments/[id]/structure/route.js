import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Tournament from "../../../../../model/Tournament";

async function handler(request, { params }) {
  await dbConnect();

  const id = params.id; // Extract the tournament ID from params
  const { structureData } = await request.json(); // Correctly parse the request body

  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      { structure: structureData },
      { new: true },
    );

    if (!updatedTournament) {
      return NextResponse.status(404).json({ message: "Tournament not found" });
    }

    return NextResponse.json({
      message: "Tournament structure updated successfully",
      tournament: updatedTournament,
    });
  } catch (error) {
    console.error("Error updating tournament structure", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the tournament structure",
      },
      { status: 500 },
    );
  }
}

export { handler as POST };

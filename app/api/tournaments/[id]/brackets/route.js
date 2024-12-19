import dbConnect from "../../../../../lib/dbConnect";
import Bracket from "../../../../../model/Bracket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const brackets = await Bracket.find({ tournamentId: id });
    return NextResponse.json(brackets);
  } catch (error) {
    console.error("Error fetching brackets for tournament:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

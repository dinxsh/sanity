import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Bracket from "../../../../model/Bracket";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    await dbConnect();

    const bracket = await Bracket.findById(id);

    if (!bracket) {
      return NextResponse.json({ error: "Bracket not found" }, { status: 404 });
    }

    return NextResponse.json(bracket);
  } catch (error) {
    console.error("Error in GET /tournament-bracket/:id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

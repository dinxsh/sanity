import dbConnect from "../../../../lib/dbConnect";
import Bracket from "../../../../model/Bracket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  console.log("Fetching bracket with ID:", id);
  try {
    await dbConnect();

    const bracket = await Bracket.findById(id);

    if (!bracket) {
      return NextResponse.json({ error: "Bracket not found" }, { status: 404 });
    }

    return NextResponse.json(bracket);
  } catch (error) {
    console.error("Error fetching bracket:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}

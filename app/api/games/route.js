import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Games from "../../../model/Games";

export async function GET(req) {
  await dbConnect();

  try {
    const gameData = await Games.find().lean();

    return NextResponse.json(gameData, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

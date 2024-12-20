import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Games from "../../../model/Games";

export async function GET(req) {
  await dbConnect();

  try {
<<<<<<< HEAD
    const gameData = await Games.find().lean();
=======
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "";
    const query = {
      category: { $regex: new RegExp(filter, "i") },
    };
    const gameData = await Games.find(query).lean();
>>>>>>> b418101d01fe295be81b7e9ac6f6e768af6ec6b3

    return NextResponse.json(gameData, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}


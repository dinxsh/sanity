import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Games from "../../../model/Games";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "";

    const query = {
      category: { $regex: new RegExp(filter, "i") },
    };


    console.log("filter", query);

    const gameData = await Games.find(query).lean();
    console.log(gameData);
    return NextResponse.json(gameData, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

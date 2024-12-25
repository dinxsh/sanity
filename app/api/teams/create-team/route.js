import dbConnect from "../../../../lib/dbConnect";
import { teamSchema } from "../../../../model/Schema/teamSchema";
import { TeamModel } from "../../../../model/Team";
import UserModel from "../../../../model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const requestData = await request.json();

    const parsedData = teamSchema.parse(requestData);

    await dbConnect();

    // Ensure players is always an array of strings
    const playerUsernames = Array.isArray(parsedData.players)
      ? parsedData.players
      : [parsedData.players];

    const users = await UserModel.find({
      username: { $in: playerUsernames.map((p) => p.trim()) },
    });

    if (users.length !== playerUsernames.length) {
      return NextResponse.json(
        { success: false, message: "Some usernames do not exist." },
        { status: 400 },
      );
    }

    const playerIds = users.map((user) => user._id);

    // Create a new team with the validated and formatted data
    const formattedData = {
      ...parsedData,
      players: playerIds,
    };

    const team = await TeamModel.create(formattedData);

    return NextResponse.json(
      { success: true, message: "Team created successfully.", team },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { success: false, message: "Error creating team", error: error.message },
      { status: 500 },
    );
  }
}

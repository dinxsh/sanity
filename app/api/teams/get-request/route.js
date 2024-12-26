import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 },
      );
    }

    const teamId = request.nextUrl.searchParams.get("teamId");
    if (!teamId) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Team ID is required" }),
        { status: 400 },
      );
    }

    const userId = session.user._id; // Extract user ID from session

    await dbConnect();
    const team = await TeamModel.findById(teamId).populate(
      "requests",
      "username email",
    );

    if (!team) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Team not found" }),
        { status: 404 },
      );
    }

    // Check if the authenticated user is a member of the team
    const isPlayerInTeam = team.players.some(
      (player) => player.toString() === userId,
    );
    if (!isPlayerInTeam) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Forbidden: You are not a member of this team",
        }),
        { status: 403 },
      );
    }

    // Return the list of requests
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Team requests fetched successfully",
        requests: team.requests,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching team requests:", error);
    return new NextResponse(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 },
    );
  }
}

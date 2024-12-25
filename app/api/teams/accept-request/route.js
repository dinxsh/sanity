import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { TeamModel } from "../../../../model/Team";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401 },
    );
  }

  const userId = session.user._id; // Extract user ID from the session
  const { teamId, playerId } = await request.json();

  if (!teamId || !playerId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Team ID and Player ID are required",
      }),
      { status: 400 },
    );
  }

  await dbConnect();

  try {
    const team = await TeamModel.findById(teamId);

    if (!team) {
      return new Response(
        JSON.stringify({ success: false, message: "Team not found" }),
        { status: 404 },
      );
    }

    // Check if the authenticated user is a member of the team
    const isPlayerInTeam = team.players.some(
      (player) => player.toString() === userId,
    );
    if (!isPlayerInTeam) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Forbidden: You are not a member of this team",
        }),
        { status: 403 },
      );
    }

    // Add the new player to the team
    if (!team.players.includes(playerId)) {
      team.players.push(playerId);
      await team.save();
    }

    return new Response(
      JSON.stringify({ success: true, message: "Player added successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding player:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 },
    );
  }
}

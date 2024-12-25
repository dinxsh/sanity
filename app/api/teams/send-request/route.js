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
  const { teamId } = await request.json();

  await dbConnect();

  try {
    const team = await TeamModel.findById(teamId);

    if (!team) {
      return new Response(
        JSON.stringify({ success: false, message: "Team not found" }),
        { status: 404 },
      );
    }

    // Check if the user has already requested to join
    if (team.requests.includes(userId)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You have already requested to join this team",
        }),
        { status: 400 },
      );
    }

    // Add the user to the team's requests
    team.requests.push(userId);
    await team.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Join request sent successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error making join request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 },
    );
  }
}

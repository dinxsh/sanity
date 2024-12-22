import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";
import UserModel from "../../../../model/User";

export async function POST(req) {
  await dbConnect();
  const { teamId, userId } = await req.json();

  try {
    const team = await TeamModel.findById(teamId);
    const user = await UserModel.findById(userId);

    if (!team || !user) {
      return new Response(
        JSON.stringify({ success: false, message: "Team or User not found" }),
        { status: 404 },
      );
    }

    if (team.requests.includes(userId)) {
      return new Response(
        JSON.stringify({ success: false, message: "Request already sent" }),
        { status: 400 },
      );
    }

    team.requests.push(userId);
    await team.save();

    return new Response(
      JSON.stringify({ success: true, message: "Request sent successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error sending request" }),
      { status: 500 },
    );
  }
}

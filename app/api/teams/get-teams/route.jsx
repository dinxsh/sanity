import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";

export async function GET() {
  await dbConnect();

  try {
    const teams = await TeamModel.find();
    return new Response(JSON.stringify({ success: true, teams }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching teams" }),
      { status: 500 },
    );
  }
}

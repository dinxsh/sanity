import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";

export async function GET(req) {
    await dbConnect();
    const { teamId } = req.query;

    try {
        const team = await TeamModel.findById(teamId).populate('requests', 'username');

        if (!team) {
            return new Response(JSON.stringify({ success: false, message: 'Team not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, requests: team.requests }), { status: 200 });
    } catch (error) {
        console.error('Error fetching requests:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error fetching requests' }), { status: 500 });
    }
}
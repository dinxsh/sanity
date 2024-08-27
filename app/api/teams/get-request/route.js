import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
        return new Response(JSON.stringify({ success: false, message: 'Team ID is required' }), { status: 400 });
    }

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
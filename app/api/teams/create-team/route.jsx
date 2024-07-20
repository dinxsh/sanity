import dbConnect from "../../../../lib/dbConnect";
import { TeamModel } from "../../../../model/Team";

export async function POST(request) {
    await dbConnect();

    try {
        const { teamname, game, role, rank, server, language, players, requests } = await request.json();

        await TeamModel.create({
                teamname,
                game,
                role,
                rank,
                server,
                language,
                players,
                requests
            });

        return Response.json({
            success: true,
            message: 'Team created successfully.'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating team:', error);
        return Response.json({
            success: false,
            message: 'Error creating team'
        }, { status: 500 });
    }
}

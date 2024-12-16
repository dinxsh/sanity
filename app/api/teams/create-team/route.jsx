import dbConnect from "../../../../lib/dbConnect";
import { teamSchema } from "../../../../model/Schema/teamSchema";
import { TeamModel } from "../../../../model/Team";

export async function POST(request) {
    await dbConnect();

    try {
        // Parse JSON body from the request
        const { teamname, game, role, rank, server, language, players, participantCount} = await request.json();

        // Zod validation
        const parsedData = teamSchema.parse({
            teamname,
            game,
            role,
            rank,
            server,
            language,
            players,
            participantCount,
            // requests,
        });

        // Ensure 'requests' is always an array
        const formattedData = {
            ...parsedData,
            requests: Array.isArray(parsedData.requests) ? parsedData.requests : [parsedData.requests],
        };

        // Create a new team document in the database
        const team = await TeamModel.create(formattedData);

        console.log("Team created successfully:", team);

        return Response.json({
            success: true,
            message: "Team created successfully.",
            team,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return Response.json({
            success: false,
            message: "Error creating team",
            error: error.message,
        }, { status: 500 });
    }
}

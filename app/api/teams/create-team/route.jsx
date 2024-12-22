import dbConnect from "../../../../lib/dbConnect";
import { teamSchema } from "../../../../model/Schema/teamSchema";
import { TeamModel } from "../../../../model/Team";
import UserModel from "../../../../model/User";

export async function POST(request) {
  await dbConnect();

  try {
    // Parse JSON body from the request
    const { teamname, game, role, rank, server, language, players } =
      await request.json();

    // Zod validation
    const parsedData = teamSchema.parse({
      teamname,
      game,
      role,
      rank,
      server,
      language,
      players,
    });

    // Fetch ObjectIds for the players from the UserModel
    const playerUsernames = parsedData.players.map((player) => player.trim());
    const users = await UserModel.find({ username: { $in: playerUsernames } });

    if (users.length !== playerUsernames.length) {
      return Response.json(
        {
          success: false,
          message: "Some usernames do not exist.",
        },
        { status: 400 },
      );
    }

    // Extract ObjectIds from the found users
    const playerIds = users.map((user) => user._id);

    // Create the team with ObjectIds in the players array
    const formattedData = {
      ...parsedData,
      players: playerIds,
    };

    const team = await TeamModel.create(formattedData);

    return Response.json(
      {
        success: true,
        message: "Team created successfully.",
        team,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating team:", error);
    return Response.json(
      {
        success: false,
        message: "Error creating team",
        error: error.message,
      },
      { status: 500 },
    );
  }
}


import dbConnect from '../../../lib/dbConnect';
import Bracket from '../../../model/Bracket';
import { NextResponse } from 'next/server';
import Tournament from '../../../model/Tournament';
import { z } from 'zod';

const bracketSchema = z.object({
    tournament_name: z.string().min(1),
    format: z.enum(['single_elimination', 'double_elimination']),
    consolationFinal: z.boolean().default(false),
    grandFinalType: z.enum(['simple', 'double']),
    teams: z.array(z.string().min(1)).min(4, "At least 4 teams are required")
})

export async function POST(request) {
  try {
    await dbConnect();

        const body = await request.json();

        const validation = bracketSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        console.log(validation.data)

        return NextResponse.json(validation.data, { status: 201 });

        // const { tournament_id, consolationFinal, grandFinalType } = validation.data;


        // const tournament = await Tournament.findById(tournament_id);
        // if (!tournament) {
        //     return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
        // }

        // const bracketName = tournament.tournamentName;
        // const registeredCount = tournament.teamsRegistered.length

        // const newBracket = new Bracket({
        //     bracketName,
        //     tournamentId: tournament_id,
        //     BracketNumber: registeredCount,
        //     consolationFinal,
        //     grandFinalType,
        // });

        // await newBracket.save();

        // // Update the tournament with the new bracket
        // await Tournament.findByIdAndUpdate(tournament_id,
        //     { $push: { brackets: newBracket._id } }
        // );

        // return NextResponse.json({
        //     message: 'Bracket created and associated with tournament successfully',
        //     id: newBracket._id
        // }, { status: 201 });
    } catch (error) {
        console.error('Error creating bracket:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}

export async function GET() {
  try {
    await dbConnect();
    const brackets = await Bracket.find({}).sort({ createdAt: -1 });
    return NextResponse.json(brackets);
  } catch (error) {
    console.error("Error fetching brackets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

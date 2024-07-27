import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import Tournament from '../../../model/Tournament';
import Games from '../../../model/Games';
import Organizer from '../../../model/Organizer';

export async function GET(request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const gameType = searchParams.get('gameType');
    const organizerId = searchParams.get('organizerId');

    const skip = (page - 1) * limit;

    const query = {};
    if (gameType) query.gameType = gameType;
    if (organizerId) query.organizerId = organizerId;

    try {
        console.log('Fetching tournaments with params:', { page, limit, gameType, organizerId });

        // Ensure models are registered
        Games;
        Organizer;

        const tournaments = await Tournament.find(query)
            .populate('gameId', 'name category gameBannerPhoto')
            .populate('organizerId', 'orgName bannerPhoto')
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Tournament.countDocuments(query);

        console.log(`Found ${tournaments.length} tournaments out of ${total} total`);

        return NextResponse.json({
            tournaments,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
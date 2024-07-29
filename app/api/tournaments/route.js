import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
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
        const tournaments = await Tournament.find(query)
            .populate('gameId', 'name category gameBannerPhoto')
            .populate('organizerId', 'orgName bannerPhoto')
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Tournament.countDocuments(query);

        return NextResponse.json({
            tournaments,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();

    const {
        tournamentName,
        tournamentFormat,
        registrationEndDate,
        tournamentStartDate,
        tournamentEndDate,
        maxTeamMembers,
        minTeamMembers,
        maxTeams,
        minTeams,
        tournamentVisibility,
        inviteCode,
        prizeConfig,
        rules,
        sponsors,
        gameParameter,
        parameterPoints,
        roundType,
        numberOfMatches,
        qualifyingTeamsPerGroup,
        wildcardPlayers,
        teamsPerGroup,
        roundName,
        tournamentIcon,
        tournamentBanner,
        selectedPlatform,
        participantType,
        selectedTimezone,
        size,
        gameId,
        organizerId
    } = await request.json();

    try {
        const newTournament = new Tournament({
            tournamentName,
            tournamentFormat,
            registrationEndDate,
            tournamentStartDate,
            tournamentEndDate,
            maxTeamMembers,
            minTeamMembers,
            maxTeams,
            minTeams,
            tournamentVisibility,
            inviteCode,
            prizeConfig,
            rules,
            sponsors,
            gameParameter,
            parameterPoints,
            roundType,
            numberOfMatches,
            qualifyingTeamsPerGroup,
            wildcardPlayers,
            teamsPerGroup,
            roundName,
            tournamentIcon,
            tournamentBanner,
            selectedPlatform,
            participantType,
            selectedTimezone,
            size,
            gameId,
            organizerId
        });

        await newTournament.save();

        return NextResponse.json({
            message: 'Tournament created successfully'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}

// pages/api/register.js

import { dbConnect } from '../../../../lib/dbConnect';
import Tournament from '../../../../model/Tournament';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { tournamentId, teamName, members, inviteCode } = req.body;

    if (!tournamentId || !teamName || !members || members.length === 0) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await dbConnect();

        const tournament = await Tournament.findById(tournamentId);

        if (!tournament) {
            return res.status(404).json({ error: 'Tournament not found' });
        }

        if (tournament.tournamentVisibility === 'private' && tournament.inviteCode !== inviteCode) {
            return res.status(403).json({ error: 'Invalid invite code' });
        }

        if (tournament.registeredNumber >= tournament.slots) {
            return res.status(400).json({ error: 'Tournament is full' });
        }

        const registration = {
            teamName,
            members,
            inviteCode,
            paymentStatus: 'pending',
        };

        tournament.teamsRegistered.push(registration);
        tournament.registeredNumber += 1;
        await tournament.save();

        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        console.error('Error registering team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
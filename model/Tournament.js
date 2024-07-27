const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    tournamentName: String,
    tournamentDates: {
        created: { type: Date, default: Date.now },
        started: Date,
        ended: Date
    },
    schedules: Schema.Types.Mixed,
    organizerId: { type: Schema.Types.ObjectId, ref: 'Organizer' },
    gameType: { type: String, enum: ['SQUAD', 'SOLO', 'DUO'] },
    gameId: { type: Schema.Types.ObjectId, ref: 'Games' },
    links: Schema.Types.Mixed,
    gameBannerPhoto: String,
    results: [Schema.Types.Mixed],
    teamsRegistered: [{
        id: Schema.Types.ObjectId,
        name: String,
        members: [Schema.Types.ObjectId]
    }],
    rounds: [Schema.Types.Mixed],
    teamSize: Number,
    prize: [Schema.Types.Mixed],
    howToX: [String],
    rules: String,
    slots: Number,
    email: String,
    registeredNumber: { type: Number, default: 0 }
});

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
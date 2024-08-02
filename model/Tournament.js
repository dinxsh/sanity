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
    registeredNumber: { type: Number, default: 0 },
    tournamentFormat: String,
    registrationEndDate: Date,
    tournamentStartDate: Date,
    tournamentEndDate: Date,
    maxTeamMembers: Number,
    minTeamMembers: Number,
    maxTeams: Number,
    minTeams: Number,
    tournamentVisibility: { type: String, enum: ['public', 'private'] },
    inviteCode: String,
    prizeConfig: [Schema.Types.Mixed],
    sponsors: [Schema.Types.Mixed],
    gameParameter: String,
    parameterPoints: String,
    roundType: String,
    numberOfMatches: Number,
    qualifyingTeamsPerGroup: Number,
    wildcardPlayers: Number,
    teamsPerGroup: Number,
    roundName: String,
    tournamentIcon: String,
    tournamentBanner: String,
    selectedPlatform: String,
    participantType: String,
    selectedTimezone: String,
    size: String
});

// Add indexes
TournamentSchema.index({ organizerId: 1 });
TournamentSchema.index({ gameId: 1 });
TournamentSchema.index({ gameType: 1 });
TournamentSchema.index({ tournamentVisibility: 1 });
TournamentSchema.index({ tournamentStartDate: 1 });
TournamentSchema.index({ registrationEndDate: 1 });

// Compound indexes for common query patterns
TournamentSchema.index({ organizerId: 1, gameType: 1 });
TournamentSchema.index({ gameId: 1, tournamentStartDate: 1 });
TournamentSchema.index({ tournamentVisibility: 1, registrationEndDate: 1 });

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;

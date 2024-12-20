const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TournamentSchema = new Schema(
  {
    tournamentName: { type: String, required: true },
    tournamentDates: {
      created: { type: Date, default: Date.now },
      started: Date,
      ended: Date,
    },
    schedules: Schema.Types.Mixed,
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    gameType: { type: String, enum: ["SQUAD", "SOLO", "DUO"], required: true },
    gameId: { type: Schema.Types.ObjectId, ref: "Games", required: true },
    links: Schema.Types.Mixed,
    gameBannerPhoto: String,
    results: [Schema.Types.Mixed],
    teamsRegistered: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        members: [{ type: String }],
        email: { type: String, required: true, lowercase: true, trim: true },
        selectedPlatform: { type: String, required: true },
        participantType: { type: String, required: true },
      },
    ],
    participantCount: {
      type: Number,
      required: true,
      min: 1,
    },
    rounds: [Schema.Types.Mixed],
    teamSize: { type: Number, min: 1 },
    prize: [Schema.Types.Mixed],
    howToX: [String],
    rules: String,
    slots: { type: Number, min: 1 },
    email: { type: String, lowercase: true, trim: true },
    registeredNumber: { type: Number, default: 0, min: 0 },
    tournamentFormat: String,
    registrationEndDate: Date,
    tournamentStartDate: Date,
    tournamentEndDate: Date,
    maxTeamMembers: { type: Number, min: 1 },
    minTeamMembers: { type: Number, min: 1 },
    maxTeams: { type: Number, min: 1 },
    minTeams: { type: Number, min: 1 },
    tournamentVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    inviteCode: String,
    prizeConfig: [Schema.Types.Mixed],
    sponsors: [Schema.Types.Mixed],
    gameParameter: String,
    parameterPoints: String,
    roundType: String,
    numberOfMatches: { type: Number, min: 1 },
    qualifyingTeamsPerGroup: { type: Number, min: 0 },
    wildcardPlayers: { type: Number, min: 0 },
    teamsPerGroup: { type: Number, min: 1 },
    roundName: String,
    tournamentIcon: String,
    tournamentBanner: String,
    selectedPlatform: String,
    participantType: String,
    selectedTimezone: String,
    size: String,
    brackets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bracket" }],
  },
  { timestamps: true },
);

// Indexes remain the same

const Tournament =
  mongoose.models.Tournament || mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;

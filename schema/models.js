const mongoose = require('mongoose');

const TournamentDatesSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  started: Date,
  ended: Date,
});

const TeamRegistrationSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
});

const TournamentSchema = new mongoose.Schema({
  tournamentName: { type: String, required: true },
  tournamentDates: TournamentDatesSchema,
  schedules: mongoose.Schema.Types.Mixed,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  gameType: { type: String, enum: ['SQUAD', 'SOLO', 'DUO'], required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Games', required: true },
  links: mongoose.Schema.Types.Mixed,
  gameBannerPhoto: String,
  results: [mongoose.Schema.Types.Mixed],
  teamsRegistered: [TeamRegistrationSchema],
  rounds: [mongoose.Schema.Types.Mixed],
  teamSize: { type: Number, required: true },
  prize: [mongoose.Schema.Types.Mixed],
  howToX: [String],
  rules: { type: String, required: true },
  slots: { type: Number, required: true },
  email: { type: String, required: true },
  registeredNumber: { type: Number, default: 0 },
});

const GamesSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  category: { type: String, required: true },
  linkedTournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
  profile: { type: String, required: true },
  gameBannerPhoto: { type: String, required: true },
});

const OrganizerSchema = new mongoose.Schema({
  orgName: { type: String, unique: true, required: true },
  orgEmail: { type: String, unique: true, required: true },
  description: String,
  bannerPhoto: String,
  twoFactorActivated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  socials: [String],
  members: [String],
  eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
});

mongoose.model('Tournament', TournamentSchema);
mongoose.model('Games', GamesSchema);
mongoose.model('Organizer', OrganizerSchema);


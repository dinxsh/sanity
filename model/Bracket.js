const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  id: Number,
  name: String,
  tournament_id: String,
});

const matchSchema = new Schema({
  child_count: Number,
  group_id: Number,
  id: Number,
  number: Number,
  opponent1: {
    id: Number,
    position: Number,
  },
  opponent2: {
    id: Number,
    position: Number,
  },
  round_id: Number,
  stage_id: Number,
  status: Number,
});

const roundSchema = new Schema({
  group_id: Number,
  id: Number,
  number: Number,
  stage_id: Number,
});

const stageSchema = new Schema({
  id: Number,
  name: String,
  number: Number,
  settings: {
    consolationFinal: Boolean,
    grandFinalType: String,
    matchesChildCount: Number,
    seedOrdering: [String],
    size: Number,
  },
  tournament_id: String,
  type: String,
});

const BracketSchema = new Schema({
  group: [
    {
      id: Number,

      number: Number,
      stage_id: Number,
    },
  ],
  match: [matchSchema],
  participant: [participantSchema],
  round: [roundSchema],
  stage: [stageSchema],
  match_game: Array,
  tournamentName: { type: String, required: true },
  format: {
    type: String,
    enum: ["single_elimination", "double_elimination"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Bracket || mongoose.model("Bracket", BracketSchema);

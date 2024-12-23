const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BracketSchema = new Schema({
  tournamentName: { type: String, required: true },
  format: {
    type: String,
    enum: ["single_elimination", "double_elimination"],
    required: true,
  },
  BracketSize: { type: Number, required: true },
  consolationFinal: { type: Boolean, required: true },
  grandFinalType: {
    type: String,
    enum: ["none", "simple", "double"],
    required: true,
  },
  teams: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Bracket || mongoose.model("Bracket", BracketSchema);

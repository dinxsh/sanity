import mongoose, { Schema } from 'mongoose';

const {String, Date} = Schema.Types;

const TeamsSchema = new mongoose.Schema({
  teamname: { type: String, required: true },
  game: { type: String, required: true },
  role: { type: String, required: true },
  rank: { type: String, required: true },
  server: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const TeamsModel = mongoose.models.Teams || mongoose.model('Teams', TeamsSchema);

module.exports = {
  TeamsModel
}
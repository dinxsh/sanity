const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  game: { type: String, required: true },
  role: { type: String, required: true },
  rank: { type: String, required: true },
  server: { type: String, required: true },
  language: { type: String, required: true },
  players: [{ type: String }],
  requests: [{ type: String }]
});

module.exports = mongoose.models.TeamModel || mongoose.model('TeamModel', TeamSchema)

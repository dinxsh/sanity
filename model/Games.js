// model/Games.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GamesSchema = new Schema({
  name: { type: String, unique: true },
  category: String,
  profile: String,
  gameBannerPhoto: String,
});

const Games = mongoose.models.Games || mongoose.model("Games", GamesSchema);

module.exports = Games;

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  image: { type: String },
  teamname: { type: String, required: true },
  game: { type: String, required: true },
  role: { type: String, required: true },
  rank: { type: String, required: true },
  server: { type: String, required: true },
  language: { type: String, required: true },
  players: [{ type: String, required: true }],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
});

const TeamModel =
  mongoose.models.TeamModel || mongoose.model("TeamModel", TeamSchema);

module.exports = {
<<<<<<< HEAD
  TeamModel
};
=======
  TeamModel,
};
>>>>>>> b418101d01fe295be81b7e9ac6f6e768af6ec6b3

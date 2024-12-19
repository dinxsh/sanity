const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizerSchema = new Schema({
  orgName: { type: String, unique: true },
  orgEmail: { type: String, unique: true },
  description: String,
  bannerPhoto: String,
  twoFactorActivated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  socials: [String],
  members: [String],
});

// module.exports = mongoose.model('Organizer', OrganizerSchema);

const Organizer =
  mongoose.models.Organizer || mongoose.model("Organizer", OrganizerSchema);

module.exports = Organizer;

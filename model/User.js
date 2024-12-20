const mongoose = require("mongoose");
<<<<<<< HEAD
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
=======
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  bio: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: "",
  },
  discordId: {
    type: String,
    default: "",
  },
  twoFactorActivated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifyCode: {
    type: String,
    required: [true, "Verification Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is a must"],
  },
  password: {
    type: String || "",
    required: [true, "Password is required"],
  },
  eventsRegistered: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
>>>>>>> b418101d01fe295be81b7e9ac6f6e768af6ec6b3
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    bio: {
        type: String,
        default: "",
    },
    discordId: {
        type: String,
        default: "",
    },
    googleId: {
        type: String,
        default: "",
    },
    twoFactorActivated: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verifyCode: {
        type: String,
        required: [true, "Verification Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is a must"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    eventsRegistered: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tournament",
        },
    ],
});

<<<<<<< HEAD
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
=======
module.exports =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
>>>>>>> b418101d01fe295be81b7e9ac6f6e768af6ec6b3

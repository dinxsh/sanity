import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  name?: string;
  email: string;
  bio?: string;
  discordId?: string;
  googleId?: string;
  twoFactorActivated: boolean;
  createdAt: Date;
  verifyCode: string;
  verifyCodeExpiry: Date;
  password: string;
  eventsRegistered: Array<mongoose.Types.ObjectId>;
}

interface IUserMethods {
  updatePassword(newPassword: string): Promise<void>;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByEmail(email: string): Promise<IUser | null>;
}

//  Created the User Schema
const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
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

// Created the User Model
const UserModel =
  mongoose.models.UserModel ||
  mongoose.model<IUser, IUserModel>("UserModel", userSchema);
export default UserModel;

import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the User document
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
    eventsRegistered: mongoose.Types.ObjectId[];
}

// Create the user schema
const userSchema = new Schema<IUser>({
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

// Create the User model
const UserModel = mongoose.model<IUser>("User", userSchema);

// Export the model
export default UserModel;

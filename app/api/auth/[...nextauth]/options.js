const { NextAuthOptions } = require("next-auth");
const GoogleProvider = require("next-auth/providers/google").default;
const DiscordProvider = require("next-auth/providers/discord").default;
const bcrypt = require("bcryptjs");
const UserModel = require("../../../../model/User").default;
const dbConnect = require("../../../../lib/dbConnect");
const CredentialsProvider = require("next-auth/providers/credentials").default;

// Add the bypass credentials
const bypassCredentials = {
  email: "test@gmail.com",
  password: "Gkjdfnjg$3",
};

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify email" } },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          // Check for bypass credentials
          if (
            credentials.email === bypassCredentials.email &&
            credentials.password === bypassCredentials.password
          ) {
            console.warn(
              "Using bypass credentials. Remove this before production!",
            );
            return {
              id: "test-user",
              email: bypassCredentials.email,
              username: "Test User",
              twoFactorActivated: true,
            };
          }

          // Existing authentication logic
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });
          if (!user) {
            console.log("User not found");
            return null;
          }
          // Temporarily disable two-factor check for testing
          // if (!user.twoFactorActivated) {
          //   console.log('Two-factor authentication not activated');
          //   return null;
          // }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username,
              twoFactorActivated: user.twoFactorActivated,
            };
          } else {
            console.log("Incorrect password");
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.twoFactorActivated = user.twoFactorActivated;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.twoFactorActivated = token.twoFactorActivated;
        session.user.username = token.username;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "credentials") {
        return user !== null;
      }
      try {
        await dbConnect();
        let existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new UserModel({
            email: user.email,
            username: user.name,
            password: null,
            googleId: account.provider === "google" ? profile.sub : null,
            discordId: account.provider === "discord" ? profile.id : null,
            twoFactorActivated: true,
            createdAt: Date.now(),
            eventsRegistered: [],
          });
          await newUser.save();
        } else {
          if (account.provider === "google" && !existingUser.googleId) {
            existingUser.googleId = profile.sub;
          } else if (
            account.provider === "discord" &&
            !existingUser.discordId
          ) {
            existingUser.discordId = profile.id;
          }
          existingUser.twoFactorActivated = true;
          await existingUser.save();
        }
        return true;
      } catch (error) {
        console.error(`Error signing in with ${account.provider}:`, error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

module.exports = { authOptions };

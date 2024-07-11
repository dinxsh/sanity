import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import bcrypt from "bcryptjs";
import UserModel from "../../../../model/User";
import dbConnect from "../../../../lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify email' } },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials.identifier }, { username: credentials.identifier }],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.twoFactorActivated) {
            throw new Error('Please verify your account first');
          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect Password');
          }
        } catch (error) {
          throw new Error(error.message);
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
      await dbConnect();
      try {
        let existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new UserModel({
            email: user.email,
            username: user.name,
            password: null,
            googleId: account.provider === 'google' ? profile.sub : null,
            discordId: account.provider === 'discord' ? profile.id : null,
            twoFactorActivated: false,
            createdAt: Date.now(),
            eventsRegistered: [],
          });
          await newUser.save();
        } else {
          if (account.provider === 'google' && !existingUser.googleId) {
            existingUser.googleId = profile.sub;
          } else if (account.provider === 'discord' && !existingUser.discordId) {
            existingUser.discordId = profile.id;
          }
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
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

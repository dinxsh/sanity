import { NextAuthOptions } from "next-auth" 
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import UserModel from "../../../../model/User"
import dbConnect from "../../../../lib/dbConnect"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "text"},
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    if(user.twoFactorActivated){
                        throw new Error('Please verify your account first')
                    }
                    const isPasswordCorrect = await  bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('Incorrect Password')
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }

        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token._id = user._id?.toString()
                token.twoFactorActivated = user.twoFactorActivated;
                token.username = user.username;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user._id = token._id;
                session.user.twoFactorActivated = token.twoFactorActivated;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
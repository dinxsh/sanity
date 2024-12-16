import { sendVerificationEmail } from "../../../components/emails/sendVerificationEmail";
import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try{
        console.log('connected');
        await dbConnect();
    }catch(e){
        console.log('error connectong db');
        console.log(e);
    }
    

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedUsername = await UserModel.findOne({
            username,
            twoFactorActivated: true
        });

        if (existingUserVerifiedUsername) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.twoFactorActivated) {
                return Response.json({
                    success: false,
                    message: 'User already exists with this email'
                }, { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            //it will create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                twoFactorActivated: false,
                createdAt: Date.now(),
                verifyCode,
                verifyCodeExpiry: expiryDate,
                eventsRegistered: []
            });

            await newUser.save();
        }

        console.log('user created ..now sending email request');
        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        console.log('email bhej di haa... is pe '+email);
        
        if (!emailResponse.success) {
            console.log('email bhejne me khed ha');
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: 'User registered successfully. Please verify your account.',
            verifyCode:verifyCode
        }, { status: 201 });

    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json({
            success: false,
            message: 'Error registering user'
        }, { status: 500 });
    }
}

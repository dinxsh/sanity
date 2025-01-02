import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { identifier, password } = await request.json();

    const existingUser = await UserModel.findOne({ email: identifier });
    console.log(existingUser);
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User Doesn't Exist",
        },
        { status: 400 },
      );
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return Response.json(
        {
          success: false,
          message: "Password Incorrect",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        success: true,
        message: `Welcome Back! ${existingUser.username}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error While Signing in",
      },
      { status: 500 },
    );
  }
}

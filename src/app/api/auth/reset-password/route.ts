import User from "@/models/User";
import { hashPassword } from "@/utils/bcrypt";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword } = await req.json();

    await dbConnect();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required", status: false },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", status: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", status: false },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: (error as Error).message,
        status: false,
      },
      { status: 500 }
    );
  }
}

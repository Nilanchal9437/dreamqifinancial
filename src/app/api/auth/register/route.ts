import User from "@/models/User";

import { hashPassword } from "@/utils/bcrypt";
import { signToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = await req.json();

    await dbConnect();

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", status: false },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists.", status: false },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();
    
    const token = await signToken({ id: newUser._id, role: newUser.role });

    const response = NextResponse.json(
      {
        message: "register successfully",
        data: { id: newUser._id, role: newUser.role },
        status: true,
      },
      { status: 201 }
    );

    response.cookies.set("dreamqifinancial", `${token}`, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      priority: "high",
    });

    response.cookies.set(
      "user",
      `${JSON.stringify({
        id: newUser._id,
        role: newUser.role,
        email: newUser.email,
        phone: newUser.phoneNumber,
      })}`,
      {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60,
        priority: "high",
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error, status: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed", status: false },
    { status: 405 }
  );
}

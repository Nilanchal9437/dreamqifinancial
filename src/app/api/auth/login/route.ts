import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/bcrypt";
import { signToken } from "@/utils/jwt";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials.", status: false },
        { status: 400 }
      );
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials.", status: false },
        { status: 400 }
      );
    }

    const token = await signToken({ id: user._id, role: user.role });

    const response = NextResponse.json(
      {
        message: "login successfully",
        data: { id: user._id, role: user.role },
        status: true,
      },
      { status: 200 }
    );

    response.cookies.set("officer", `${token}`, {
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
        id: user._id,
        role: user.role,
        email: user.email,
        phone: user.phoneNumber,
        company_id: user.company_id,
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

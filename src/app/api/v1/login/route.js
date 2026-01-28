import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectMongo();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (user.isAdmin !== true) {
      return NextResponse.json(
        { message: "Your account does not have admin privileges." },
        { status: 401 },
      );
    }

    // --- Create JWT Token ---
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token will expire in 1 day
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      resume: user.resume,
      isAdmin: user.isAdmin,
    };

    // --- Create the response and set the cookie ---
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/", // Cookie is available for the entire site
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 },
    );
  }
}

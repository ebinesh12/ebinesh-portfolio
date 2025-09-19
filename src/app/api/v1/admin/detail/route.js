import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectMongo();

    // Fetch the user and all necessary fields, including profileImage and resume
    const user = await User.findById(userId).select(
      "username email profileImage resume",
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      resume: user.resume,
    };

    return NextResponse.json(
      {
        message: "Refetched Data",
        user: userResponse,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.error("Get User Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 },
    );
  }
}

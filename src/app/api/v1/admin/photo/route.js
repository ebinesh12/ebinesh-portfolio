import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectMongo();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const formData = await req.formData();
    const profileImageFile = formData.get("profileImage");

    if (!profileImageFile) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const imageBuffer = Buffer.from(await profileImageFile.arrayBuffer());
    user.profileImage = {
      data: imageBuffer,
      contentType: profileImageFile.type,
    };

    await user.save();

    return NextResponse.json(
      { message: "Profile picture updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating profile picture:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Error updating profile picture", error: error.message },
      { status: 500 },
    );
  }
}

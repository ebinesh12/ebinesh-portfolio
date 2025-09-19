import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectMongo();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile");

    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { message: "No file provided." },
        { status: 400 },
      );
    }

    // Read the file into a buffer
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Update the user's resume field
    user.resume = {
      data: fileBuffer,
      contentType: resumeFile.type,
      filename: resumeFile.name,
    };

    await user.save();

    return NextResponse.json(
      { message: "Resume uploaded successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resume Upload Error:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

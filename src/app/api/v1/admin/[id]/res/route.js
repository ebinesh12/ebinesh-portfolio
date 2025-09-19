import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUserId = decoded.id;

    if (loggedInUserId !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    await connectMongo();
    const user = await User.findById(id).select("resume");

    if (!user || !user.resume || !user.resume.data) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 },
      );
    }

    // Set headers for file download
    const headers = new Headers();
    headers.set("Content-Type", user.resume.contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${user.resume.filename || "resume"}"`,
    );

    // Return the file buffer as a response
    return new Response(user.resume.data, { status: 200, headers });
  } catch (error) {
    console.error("Resume Retrieval Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";

export async function GET(req) {
  try {
    // const id = "68cc3f1a8aa2943ea1458f6a"; // DEV
    const id = "68cb246bfa97fb3a36ac5b7a"; // PROD

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

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
    const user = await User?.findById(id)?.select("profileImage");

    if (!user || !user.profileImage || !user.profileImage.data) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    const imageData = user?.profileImage.data;
    const contentType = user?.profileImage.contentType;

    return new NextResponse(imageData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Error fetching user image:", error);
    return NextResponse.json(
      { message: "Error fetching image", error: error.message },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import ProjectModel from "@/models/projectModel"; // Corrected import

// @access  Public
export async function GET(req) {
  try {
    await connectMongo();

    const projectsData = await ProjectModel.findOne({});
    if (!projectsData) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: projectsData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// @access  Private (Admin)
export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    const projectsData = await ProjectModel.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: projectsData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

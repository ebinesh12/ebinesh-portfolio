import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import ExperienceModel from "@/models/experienceModel";

// @access  Public
export async function GET(req) {
  try {
    await connectMongo();

    const experienceData = await ExperienceModel.findOne({});
    if (!experienceData) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: experienceData });
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

    const experienceData = await ExperienceModel.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: experienceData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

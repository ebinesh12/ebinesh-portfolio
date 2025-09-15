import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import AchievementModel from "@/models/achievementModel";

// @access  Public
export async function GET(req) {
  try {
    await connectMongo();

    const achievementsData = await AchievementModel.findOne({});
    if (!achievementsData) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: achievementsData });
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

    const achievementsData = await AchievementModel.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: achievementsData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

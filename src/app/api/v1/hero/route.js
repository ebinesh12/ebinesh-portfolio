import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import HeroModel from "@/models/heroModel";

// @access  Public
export async function GET(req) {
  try {
    await connectMongo();
    const heroData = await HeroModel.findOne({});

    if (!heroData) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: heroData });
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

    const heroData = await HeroModel.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: heroData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

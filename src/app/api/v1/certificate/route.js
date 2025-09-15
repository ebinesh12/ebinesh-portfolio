import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import CertificateModel from "@/models/certificateModel"; // Corrected import

// @access  Public
export async function GET(req) {
  try {
    await connectMongo();

    const certificatesData = await CertificateModel.findOne({});
    if (!certificatesData) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: certificatesData });
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

    const certificatesData = await CertificateModel.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: certificatesData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

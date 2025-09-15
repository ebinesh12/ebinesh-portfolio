import ContactModel from "@/models/contactModel";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, name, subject, message } = await req.json();
    const data = { email, name, subject, message };
    await connectMongo();
    await ContactModel.create(data);
    return NextResponse.json(
      { code: 200, message: "Message has sent" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { code: 500, message: "An error occurred while sending the message." },
      { status: 200 },
    );
  }
}

export async function GET(req, res) {
  try {
    await connectMongo();
    const data = await ContactModel.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { code: 500, message: "An error occurred while sending the message." },
      { status: 200 },
    );
  }
}

export async function DELETE(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connectMongo();
    await ContactModel.findOneAndDelete({ id: Number(id) });
    return NextResponse.json(
      { code: 200, message: "Message has been deleted successfully." },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        code: 500,
        message: "An error occurred while deleting the message." + err,
      },
      { status: 200 },
    );
  }
}

export async function PUT(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name, email, subject, message } = await req.json();
    await connectMongo();
    await ContactModel.findOneAndUpdate(
      { id: Number(id) },
      { name, email, subject, message },
    );
    return NextResponse.json(
      { code: 200, message: "Message has been updated successfully." },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        code: 500,
        message: "An error occurred while updating the message." + err,
      },
      { status: 200 },
    );
  }
}

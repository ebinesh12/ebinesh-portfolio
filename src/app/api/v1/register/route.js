import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongo();

    const formData = await req.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileImageFile = formData.get("profileImage");

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 },
      );
    }

    const Username = await User.findOne({ username });
    const Email = await User.findOne({ email });

    if (Username) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 },
      );
    }
    
    if (Email) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (profileImageFile) {
      const imageBuffer = Buffer.from(await profileImageFile.arrayBuffer());
      newUser.profileImage = {
        data: imageBuffer,
        contentType: profileImageFile.type,
      };
    }

    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 },
    );
  }
}

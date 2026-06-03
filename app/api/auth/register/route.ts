import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // TODO: save { name, email, hashedPassword } to your database here

  return NextResponse.json({ message: "Account created." }, { status: 201 });
}

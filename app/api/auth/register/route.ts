import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if ( !email || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters." },
      { status: 400 },
    );
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists. Please sign in." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: "credential",
      },
      select: { email: true, name: true },
    });

    return NextResponse.json(
      { message: "Account created." },
      { status: 201 },
    );
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
  
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
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

  const user = await prisma.user.findMany({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json({
      status: 404,
      error: "user alerady exist please signin",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      provider: "credential",
    },
    select: {
      email,
      name,
    },
  });

  // TODO: save { name, email, hashedPassword } to your database here

  return NextResponse.json(
    { message: "Account created.", status: 201 },
    { status: 201 },
  );
}

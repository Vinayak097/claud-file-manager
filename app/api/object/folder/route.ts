import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
  region: "ap-southeast-2",
});

export async function POST(req: NextRequest) {
  const { prefix, name } = await req.json();

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
  }

  const key = (prefix ?? "") + name.trim() + "/";

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: "",
      ContentLength: 0,
    })
  );

  return NextResponse.json({ key });
}

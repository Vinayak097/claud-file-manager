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
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const key = formData.get("key") as string | null;

  if (!file || !key) {
    return NextResponse.json({ error: "file and key are required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
      ContentLength: buffer.byteLength,
    })
  );

  return NextResponse.json({ ok: true });
}

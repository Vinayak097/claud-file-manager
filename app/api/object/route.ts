import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_k!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
  region: "ap-southeast-2",
});
export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix") ?? "";

  console.log(process.env.NEXTAUTH_URL);
  const command = new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME!,
    Delimiter: "/",
    Prefix: prefix,
  });

  const result = await client.send(command);
  console.log(result ,  ' result')
  const files =
    result.Contents?.map((file) => ({
      name: file.Key,
      size: file.Size,
      lastModified: file.LastModified,
    })) || [];

  const folders = result.CommonPrefixes?.map((data)=>({
    name:data.Prefix
  })) || [];

  return NextResponse.json({
    files: files,
    folders,
  });
}

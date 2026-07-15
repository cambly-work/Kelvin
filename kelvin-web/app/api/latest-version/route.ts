import { NextResponse } from "next/server";
import appcast from "@/public/appcast.json";

export async function GET() {
  return NextResponse.json({
    version: appcast.version,
    url: appcast.url,
    minOS: appcast.minOS,
  });
}

// app/api/get-orphaned-images/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import config from "@/lib/config";
import { supabase } from "@/lib/superbaseclient";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get all image URLs from Supabase
    const { data: listings, error } = await supabase
      .from("listing")
      .select("images");

    if (error) throw error;

    // Extract all unique image URLs
    const dbUrls = new Set<string>();
    listings.forEach((listing) => {
      (listing.images || []).forEach((url: string) => {
        if (url && typeof url === "string") dbUrls.add(url.trim());
      });
    });

    // Get all files from ImageKit
    let allImageKitFiles: any[] = [];
    let skip = 0;
    while (true) {
      const files = await imagekit.listFiles({
        skip,
        limit: 1000,
        path: "/listings",
      });
      if (files.length === 0) break;
      allImageKitFiles = [...allImageKitFiles, ...files];
      skip += 1000;
    }

    // Count orphaned files
    const orphanCount = allImageKitFiles.filter((file) => {
      const imageKitUrl = imagekit.url({ path: file.filePath });
      return !Array.from(dbUrls).some((dbUrl) => imageKitUrl.includes(dbUrl));
    }).length;

    return NextResponse.json({
      success: true,
      count: orphanCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to count orphaned images",
      },
      { status: 500 }
    );
  }
}

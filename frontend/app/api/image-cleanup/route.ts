// app/api/cleanup-images/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { supabase } from "@/lib/superbaseclient";
import config from "@/lib/config";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // 1. Get all image URLs from Supabase
    const { data: listings, error } = await supabase
      .from("listing")
      .select("images");

    if (error) throw error;

    // 2. Extract all unique image URLs from database
    const dbUrls = new Set<string>();
    listings.forEach((listing) => {
      (listing.images || []).forEach((url: string) => {
        if (url && typeof url === "string") {
          dbUrls.add(url.trim());
        }
      });
    });

    // 3. Get all files from ImageKit
    let imageKitFiles: any[] = [];
    let skip = 0;
    while (true) {
      const files = await imagekit.listFiles({
        skip,
        limit: 1000,
        path: "/listings",
      });
      if (files.length === 0) break;
      imageKitFiles = [...imageKitFiles, ...files];
      skip += 1000;
    }

    // 4. Identify orphaned files (where no dbUrl is part of ImageKit URL)
    const orphanedFiles = imageKitFiles.filter((file) => {
      const imageKitUrl = imagekit.url({ path: file.filePath });
      // Check if ANY database URL is part of this ImageKit URL
      return !Array.from(dbUrls).some((dbUrl) => imageKitUrl.includes(dbUrl));
    });

    // 5. Delete orphaned files with confirmation
    const deletionResults = [];
    for (const file of orphanedFiles) {
      try {
        console.log(`Deleting orphaned file: ${file.filePath}`);
        await imagekit.deleteFile(file.fileId);
        deletionResults.push({ success: true, filePath: file.filePath });
      } catch (err) {
        deletionResults.push({
          success: false,
          filePath: file.filePath,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 200)); // Rate limiting
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalListings: listings.length,
        totalDbUrls: dbUrls.size,
        totalImageKitFiles: imageKitFiles.length,
        orphanedFilesFound: orphanedFiles.length,
        deletedCount: deletionResults.filter((r) => r.success).length,
        failedDeletions: deletionResults.filter((r) => !r.success).length,
      },
      sampleData: {
        keptFiles: imageKitFiles
          .filter((f) => !orphanedFiles.includes(f))
          .slice(0, 3)
          .map((f) => ({
            filePath: f.filePath,
            matchingDbUrl: Array.from(dbUrls).find((dbUrl) =>
              imagekit.url({ path: f.filePath }).includes(dbUrl)
            ),
          })),
        deletedFiles: orphanedFiles.slice(0, 3).map((f) => f.filePath),
      },
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

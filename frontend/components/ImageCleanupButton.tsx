// components/ImageCleanupButton.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ImageCleanupButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCleanup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/image-cleanup", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Cleanup failed");
      }

      toast.success(`Deleted ${data.stats.deletedCount} orphaned files`, {
        action: {
          label: "Details",
          onClick: () =>
            toast.info(
              <div className="space-y-3">
                <div>
                  <p className="font-medium">
                    Kept files (matching database URLs):
                  </p>
                  {data.sampleData.keptFiles.map((file: any, i: number) => (
                    <div key={i} className="text-sm p-2 border rounded my-1">
                      <p className="font-mono truncate">{file.filePath}</p>
                      <p className="text-xs text-muted-foreground">
                        Matches DB URL: {file.matchingDbUrl}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-medium">Deleted files (no match in DB):</p>
                  {data.sampleData.deletedFiles.map(
                    (path: string, i: number) => (
                      <p
                        key={i}
                        className="text-sm font-mono truncate p-2 border rounded my-1"
                      >
                        {path}
                      </p>
                    )
                  )}
                </div>
              </div>
            ),
        },
      });
    } catch (error) {
      toast.error("Cleanup failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Button
        onClick={handleCleanup}
        disabled={isLoading}
        variant="default"
        className="w-full"
      >
        {isLoading ? "Cleaning..." : "Delete unused images"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Will delete ImageKit files that don't contain any database URLs
      </p>
    </div>
  );
}

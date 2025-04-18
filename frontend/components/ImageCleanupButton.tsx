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

      toast.success(`Deleted ${data.stats.deletedCount} orphaned files`);
    } catch (error) {
      toast.error("Cleanup failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-8 p-4 border rounded-lg">
      <Button
        onClick={handleCleanup}
        disabled={isLoading}
        variant="default"
        className=""
      >
        {isLoading ? "Cleaning..." : "Delete unused images"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Will delete ImageKit files that don't contain any database URLs
      </p>
    </div>
  );
}

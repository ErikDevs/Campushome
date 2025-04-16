// components/OrphanedImagesCount.tsx
"use client";
import { useState, useEffect } from "react";

export function OrphanedImagesCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/strayimages");
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to fetch count");

        setCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching orphaned images count:", error);
        setCount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return (
    <>
      {loading ? (
        <div className="animate-pulse h-6 w-8 rounded" />
      ) : (
        <p className="text-2xl font-bold mt-1">
          {count !== null ? count : "Error"}
        </p>
      )}
      <p className="text-sm text-gray-500 mt-1">
        Images in ImageKit not referenced in database
      </p>
    </>
  );
}

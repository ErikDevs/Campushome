"use client";

import { ListingForm } from "@/components/ListingForm";
import { supabase } from "@/lib/superbaseclient";
import { useSession } from "next-auth/react";
import { Image } from "@imagekit/next";

import { useEffect, useState } from "react";

interface Listing {
  id: string;
  title: string;
  description: string;
  status: string;
  images: [];
  // Add other fields from your listing table
}

export default function InsertForm() {
  const { data: session } = useSession();
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!session?.user?.email) {
          setLoading(false);
          return;
        }

        setLoading(true);
        const { data: listings, error } = await supabase
          .from("listing")
          .select("*")
          .eq("email", session.user.email);

        if (error) {
          throw error;
        }

        setData(listings || []);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]); // Re-fetch when session changes

  return (
    <div className="max-w-7xl px-6 w-full mt-8 mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create your listing</h1>
        <p className="text-gray-500 text-base max-w-md">
          Enter the details about what you would like to sell
        </p>
      </div>
      <div className="flex justify-between gap-4">
        <ListingForm />

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Your Listing</h2>
          {loading ? (
            <div>Loading listings...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : data.length === 0 ? (
            <p>No listings found</p>
          ) : (
            data.map((listing) => (
              <div className="flex flex-col" key={listing.id}>
                <div>
                  <h2>{listing.title}</h2>
                  <p className="text-sm text-gray-500 max-w-md mb-4">
                    {listing.description}
                  </p>
                </div>
                <div>
                  <div className="flex gap-4 mt-4">
                    {listing.images.map((image) => (
                      <Image
                        key={image}
                        urlEndpoint={
                          process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
                        }
                        src={image}
                        width={100}
                        height={100}
                        alt="Picture of the author"
                      />
                    ))}
                  </div>
                  <h2 className="mt-4 bg-amber-500 w-fit px-2 rounded-xl py-1 flex gap-2 items-center">
                    Listing status {listing.status}
                  </h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

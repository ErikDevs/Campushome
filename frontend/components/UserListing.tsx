"use client";

import { ListingForm } from "@/components/ListingForm";
import { supabase } from "@/lib/superbaseclient";
import { useSession } from "next-auth/react";
import { Image } from "@imagekit/next";

import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

interface Listing {
  id: string;
  title: string;
  description: string;
  status: string;
  price: number; // Added price property
  images: [];

  // Add other fields from your listing table
}

const UserListing = () => {
  const { data: session } = useSession();
  const [listing, setListing] = useState<Listing[]>([]);
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

        setListing(listings || []);
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

  if (!session) {
    return (
      <div className="w-full">
        <h2>Your listing will appear here</h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create your listing</h1>
        <p className="text-gray-500 text-base max-w-md">
          Enter the details about what you would like to sell
        </p>
      </div>
      <div className="flex justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Your Listing</h2>
          {loading ? (
            <div>Loading listings...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : listing.length === 0 ? (
            <p>No listings found</p>
          ) : (
            listing.map((item) => (
              <div className="flex flex-col my-2" key={item.id}>
                <div>
                  <div className="flex gap-4 items-center mb-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p
                      className={`${
                        item.status === "pending"
                          ? " bg-amber-200 text-amber-600"
                          : item.status === "approved"
                          ? " bg-green-200 text-green-600"
                          : " bg-red-200 text-red-500"
                      } w-fit rounded py-1 px-5 text-sm flex gap-2 items-center`}
                    >
                      Status {item.status}
                    </p>

                    <EditProduct
                      productId={item.id}
                      initialData={{
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        images: item.images,
                      }}
                    />
                    <DeleteProduct
                      productId={item.id}
                      onDelete={() => {
                        setListing(
                          listing.filter((p: Listing) => p.id !== item.id)
                        );
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 max-w-md mb-4">
                    {item.description}
                  </p>
                </div>
                <div>
                  <div className="flex gap-4 mt-4">
                    {item.images.map((image) => (
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListing;

"use client"; // Required for client-side interactions

import { ListingForm } from "@/components/ListingForm";
import UserListings from "@/components/UserListings";

export default function InsertForm() {
  return (
    <div className="max-w-7xl px-6 mt-8 mx-auto">
      Create listing
      <div className="flex justify-between">
        <div className="min-w-1/2">
          <ListingForm />
        </div>
        <UserListings />
      </div>
    </div>
  );
}

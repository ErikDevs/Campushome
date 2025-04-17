import { ListingForm } from "@/components/ListingForm";
import UserListing from "@/components/UserListing";

import React from "react";

export const dynamic = "force-dynamic";

const Listing = () => {
  return (
    <div className="container px-6 mt-16 w-full justify-between gap-8 mx-auto flex flex-col md:flex-row">
      <ListingForm />
      <UserListing />
    </div>
  );
};

export default Listing;

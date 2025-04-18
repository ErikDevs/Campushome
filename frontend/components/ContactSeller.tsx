"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const ContactSeller = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session && <Button className="w-full mt-8">Contact Seller</Button>}
    </div>
  );
};

export default ContactSeller;

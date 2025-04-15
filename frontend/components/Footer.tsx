import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="w-full border-t mt-16">
      <div className="flex  container px-6 flex-col md:flex-row w-full mx-auto justify-between py-8">
        <div className="flex-col items-center gap-2">
          <h2 className="text-2xl mb-4 font-semibold">My Campus Home</h2>
          <p className="max-w-sm text-gray-500">
            The marketplace for university students to buy, sell, and swap dorm
            essentials.
          </p>
        </div>
        <div className="flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="flex-col text-gray-500 items-center gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of service</li>
          </ul>
        </div>
        <div className="flex-col  items-center gap-2">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <ul className="flex-col  text-gray-500 items-center gap-2">
            <li>Furniture</li>
            <li>Electronic</li>
            <li>Books</li>
            <li>Decorations</li>
            <li>Kitchen Items</li>
          </ul>
        </div>
        <div className="flex flex-col text-gray-500">
          <div className="flex-col items-center gap-2">
            Contact Us support@mycampushome.components
          </div>
          <div>(123) 456 7890</div>
          <div>Nairobi Tom Mbaya Street</div>
        </div>
        <Link href="/post-listing">
          <Button variant="default" className="w-fit  p-6">
            Sell Now
          </Button>
        </Link>
      </div>
      <div className="flex flex-col border-t items-center gap-2">
        <p className="text-gray-500 text-sm my-8">
          @ 2025 Copyrights. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

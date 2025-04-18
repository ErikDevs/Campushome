import { LocateIcon, Mail, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full border-t h-auto mt-16">
      <div className="flex container px-6 flex-col md:flex-row gap-2 w-full mx-auto justify-between py-8">
        <div className="flex-col items-center gap-2">
          <h2 className="text-xl mb-4 font-semibold">My Campus Home</h2>
          <p className="max-w-sm text-gray-500">
            The marketplace for university students to buy, sell, and swap dorm
            essentials.
          </p>
        </div>
        <div className="flex-col items-center gap-2">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="flex-col text-gray-500 items-center gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of service</li>
          </ul>
        </div>
        <div className="flex-col  items-center gap-2">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="flex-col  text-gray-500 items-center gap-2">
            <li>Furniture</li>
            <li>Electronic</li>
            <li>Books</li>
            <li>Decorations</li>
            <li>Kitchen Items</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="flex items-center gap-4 text-gray-500">
            <Mail /> support@mycampushome.com
          </div>
          <div className="flex gap-4 items-center text-gray-500">
            <Phone /> (123) 456 7890
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <LocateIcon />
            Tom Mboya Street
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="flex flex-col border-t items-center justify-center h-14">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Copyrights. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

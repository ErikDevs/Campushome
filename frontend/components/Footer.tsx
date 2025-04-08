import React from "react";

const Footer = () => {
  return (
    <div className="w-full border">
      <div className="flex  container w-full mx-auto justify-between py-8">
        <div>
          My Campus Home
          <p className="max-w-md">
            The marketplace for university students to buy, sell, and swap dorm
            essentials.
          </p>
        </div>
        <div>
          Quick Links
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of service</li>
          </ul>
        </div>
        <div>
          Categories
          <ul>
            <li>Furniture</li>
            <li>Electronic</li>
            <li>Books</li>
            <li>Decorations</li>
            <li>Kitchen Items</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div>Contact Us support@mycampushome.components</div>
          <div>(123) 456 7890</div>
          <div>Nairobi Tom Mbaya Street</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

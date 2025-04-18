import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col px-4 gap-6 mt-8 justify-between items-center ">
      <div className="flex mt-8 flex-col z-10">
        <div className="">
          <h1 className="text-center z-10 md:text-5xl text-4xl max-w-3xl leading-snug">
            Your <span className="font-bold">Go-To</span> Campus market in Kenya
            for Buying and Selling
          </h1>
          <p className="text-center my-4 max-w-xl mx-auto w-full">
            Buy, sell, or exchange hostel items and housing with fellow students
            — fast, easy, and right on campus.
          </p>
        </div>

        <div className="flex w-full mx-auto justify-center my-2">
          <Link href="/">
            <Button variant="default" className="p-6 rounded-4xl ">
              <a href="#products">Buy Now</a>
            </Button>
          </Link>
        </div>
      </div>

      <Image
        src="/hero.png"
        className="rounded-xl object-cover object-center mx-auto"
        alt="heroimage"
        width={2000}
        height={10}
      />
    </div>
  );
};

export default Hero;

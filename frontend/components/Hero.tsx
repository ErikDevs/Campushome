import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 mt-8 justify-between h-auto md:h-[55rem] items-center ">
      <div className="flex mt-8 flex-col">
        <div className="relative">
          <h1 className="text-center z-10  md:text-5xl text-5xl max-w-3xl leading-snug">
            Your Go-To Campus Marketplace in Kenya for Effortless Buying and
            Selling
          </h1>
          <p className="text-center my-8 max-w-2xl">
            Buy, sell, or exchange hostel items and housing with fellow students
            — fast, easy, and right on campus.
          </p>
          <div className="absolute hidden -z-10 md:top-18 left-2 md:left-6 top-12 overflow-hidden md:w-[240px] w-[100px]">
            <Image
              src="/highlight.png"
              alt="highlight"
              width={500}
              height={200}
            />
          </div>
        </div>

        <div className="flex w-full mx-auto justify-center mt-8">
          {" "}
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="default" className="w-fit rounded-full p-6">
                Explore now
              </Button>
            </Link>
            <Link href="/post-listing">
              <Button variant="outline" className="w-fit rounded-full p-6">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full border-8 mt-8 rounded-xl  overflow-hidden">
        <Image
          src="/hero.jpg"
          className="object-cover w-full rounded-lg object-top h-full"
          alt="heroimage"
          width={2000}
          height={800}
        />
      </div>
    </div>
  );
};

export default Hero;

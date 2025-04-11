import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 mt-8 justify-between h-auto md:h-[50rem] items-center ">
      <div className="flex mt-8 flex-col">
        <div className="relative">
          <h1 className="text-center z-10  md:text-5xl text-5xl max-w-3xl leading-snug">
            Your Go-To Campus Marketplace in Kenya for Effortless Buying and
            Selling
          </h1>
          <p className="text-center my-8">
            Connect, buy, and sell effortlessly with Kenya&apos;s trusted campus
            marketplace.
          </p>
          <div className="absolute -z-10 md:top-18 left-2 md:left-6 top-12 overflow-hidden md:w-[240px] w-[100px]">
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
          <Link href="/post-listing">
            <Button variant="default" className="w-fit rounded-full p-6">
              Start Selling
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full rounded-md overflow-hidden">
        <Image
          src="/hero.jpg"
          className="object-cover w-full object-top h-full rounded-xl"
          alt="heroimage"
          width={2000}
          height={800}
        />
      </div>
    </div>
  );
};

export default Hero;

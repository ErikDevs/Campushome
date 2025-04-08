import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 mt-8 justify-between h-auto md:h-[50rem] items-center ">
      <div className="flex mt-8 flex-col">
        <div className="relative">
          <h1 className="text-center z-10 font-bold md:text-5xl text-3xl max-w-2xl leading-snug">
            Online market platform for seamless selling and buying of goods in
            Kenyan campus{" "}
          </h1>
          <div className="absolute -z-10 md:top-18 left-2 md:left-6 top-12 overflow-hidden md:w-[200px] w-[100px]">
            <Image
              src="/highlight.png"
              alt="highlight"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="flex w-full mx-auto justify-center mt-8">
          {" "}
          <Button variant="outline" className="w-fit rounded-full p-6">
            Start Selling
          </Button>
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

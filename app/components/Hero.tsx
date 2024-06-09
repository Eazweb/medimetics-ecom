"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const images = ["/banner/1.jpg", "/banner/2.jpg"];
const Hero = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-10 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Elevate Your Shopping Experience
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            Discover the ultimate destination for all your shopping needs. From
            the latest trends to timeless classics, find everything you desire
            in one place.
          </p>
        </div>

        <div
          className="lg:col-span-4 mt-10 lg:mt-0 md:p-5"
          style={{ transition: "background-image 1s ease-in-out" }}
        >
          <Image
            className="w-full rounded-xl"
            src={currentImage}
            alt="Image Description"
            width={900}
            height={700}
            style={{ width: "100%", transition: "opacity 1s ease-in-out" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

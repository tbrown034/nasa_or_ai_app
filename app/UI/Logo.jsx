"use client";
import React, { useState } from "react";
import Image from "next/image";
import { audiowide } from "@/app/utils/fonts";
import realLogo from "../../public/assets/logos/nasaLogoReal.png";
import aiLogo from "../../public/assets/logos/nasaLogoNotReal.png";

// Import the font for "VS" text

const Logo = () => {
  const [isAiLogoFirst, setIsAiLogoFirst] = useState(false); // Toggle for the first logo
  const [isAiLogoSecond, setIsAiLogoSecond] = useState(true); // Toggle for the second logo (AI first by default)

  // Handle click to toggle between logos for the first image
  const toggleFirstLogo = () => {
    setIsAiLogoFirst(!isAiLogoFirst);
  };

  // Handle click to toggle between logos for the second image
  const toggleSecondLogo = () => {
    setIsAiLogoSecond(!isAiLogoSecond);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:flex-row">
      {/* First Logo (real NASA first) */}
      <div
        className="relative cursor-pointer group"
        onClick={toggleFirstLogo} // Clicking toggles this logo
      >
        <div
          className={`transition-transform duration-500 transform group-hover:scale-110`}
        >
          <Image
            src={isAiLogoFirst ? aiLogo : realLogo} // Toggle between AI and Real logo
            alt={isAiLogoFirst ? "AI Logo" : "Real NASA Logo"}
            width={150}
            height={150}
            className="transition-all duration-500"
          />
        </div>
      </div>

      {/* VS Text */}
      <div
        className={`text-5xl text-yellow-300 ${audiowide.className} transition-all duration-300 transform hover:scale-110`}
      >
        OR
      </div>

      {/* Second Logo (AI first by default) */}
      <div
        className="relative cursor-pointer group"
        onClick={toggleSecondLogo} // Clicking toggles this logo
      >
        <div
          className={`transition-transform duration-500 transform group-hover:scale-110`}
        >
          <Image
            src={isAiLogoSecond ? aiLogo : realLogo} // Toggle between AI and Real logo
            alt={isAiLogoSecond ? "AI Logo" : "Real NASA Logo"}
            width={150}
            height={150}
            className="transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Audiowide } from "next/font/google";
import realLogo from "../../public/assets/logos/nasaLogoReal.png";
import aiLogo from "../../public/assets/logos/nasaLogoAi.png"; // Use imported images for consistency

// Import the font for "VS" text
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Logo = () => {
  const [isAiLogo, setIsAiLogo] = useState(false); // Toggle between NASA and AI logos

  // Handle hover/click toggle
  const toggleLogo = () => {
    setIsAiLogo(!isAiLogo);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:flex-row">
      {/* NASA Logo (click to toggle AI logo) */}
      <div
        className="relative cursor-pointer group"
        onMouseEnter={toggleLogo}
        onMouseLeave={toggleLogo}
        onClick={toggleLogo}
      >
        <div
          className={`transition-transform duration-700 ${
            isAiLogo ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* NASA Official Logo */}
          <Image
            src={realLogo}
            alt="NASA Official Logo"
            width={150}
            height={150}
            className="transition-all duration-500 transform group-hover:scale-110"
          />
        </div>

        {/* AI Logo (Toggles on hover or click) */}
        <div
          className={`absolute top-0 left-0 transition-transform duration-700 ${
            isAiLogo ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={aiLogo}
            alt="AI Generated NASA Logo"
            width={150}
            height={150}
            className="transition-all duration-500 transform group-hover:scale-110"
          />
        </div>
      </div>

      {/* VS Text */}
      <div
        className={`text-5xl text-yellow-300 ${audiowide.className} transition-all duration-300 transform hover:scale-110`}
      >
        VS
      </div>

      {/* Static AI Logo */}
      <Image
        src={aiLogo} // Make sure you're consistently using the imported logo
        alt="AI Generated NASA Logo"
        width={150}
        height={150}
        className="transition-all duration-500 transform hover:scale-110"
      />
    </div>
  );
};

export default Logo;

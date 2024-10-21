"use client";

import { useEffect, useState } from "react";
import GameBoard from "./gameComponents/GameBoard";
import Instructions from "./gameComponents/Instructions";

export default function Play() {
  const [imageData, setImageData] = useState(null);
  const [isNasaFirst, setIsNasaFirst] = useState(true);

  const fetchRandomPair = async () => {
    setImageData(null); // Clear previous data while fetching new pair

    try {
      const response = await fetch("/api/getRandomPair");
      const data = await response.json();
      setImageData({
        metadata: data.metadata,
        nasaImageUrl: `/api/getImageA?id=${data.nasaImageId}`,
        aiImageUrl: `/api/getImageB?id=${data.aiImageId}`,
      });
      setIsNasaFirst(Math.random() > 0.5); // Randomize order
    } catch (error) {
      console.error("Failed to fetch image pair", error);
    }
  };

  useEffect(() => {
    fetchRandomPair(); // Fetch the first random pair when the page loads
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-white">
      {/* Game Title */}
      <h1 className="text-4xl font-bold text-center text-yellow-400 md:text-5xl">
        NASA or AI: The Challenge
      </h1>

      {/* Game Instructions */}
      <Instructions />

      {/* Game Board */}
      <div className="flex flex-col w-full max-w-3xl gap-4">
        {imageData && (
          <GameBoard
            imageData={imageData}
            isNasaFirst={isNasaFirst}
            fetchRandomPair={fetchRandomPair}
          />
        )}
      </div>
    </div>
  );
}

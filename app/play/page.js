"use client";

import { useEffect, useState } from "react";
import GameBoard from "./gameboard";
import LoadingSpinner from "./loading";

export default function Play() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNasaFirst, setIsNasaFirst] = useState(true);

  const fetchRandomPair = async () => {
    setLoading(true);
    setImageData(null);

    try {
      const response = await fetch("/api/getRandomPair");
      const data = await response.json();
      setImageData({
        metadata: data.metadata,
        nasaImageUrl: `/api/getImageA?id=${data.nasaImageId}`,
        aiImageUrl: `/api/getImageB?id=${data.aiImageId}`,
      });
      setIsNasaFirst(Math.random() > 0.5);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPair();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-white">
      <h1 className="text-4xl font-bold text-center text-yellow-400 md:text-5xl">
        NASA or AI: The Challenge
      </h1>

      <div className="flex flex-col w-full max-w-3xl gap-4">
        <GameBoard
          imageData={imageData}
          isNasaFirst={isNasaFirst}
          fetchRandomPair={fetchRandomPair}
        />
      </div>
    </div>
  );
}

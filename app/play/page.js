"use client";
import { useEffect, useState } from "react";
import GameBoard from "./gameboard";

export default function Play() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNasaFirst, setIsNasaFirst] = useState(true);
  const [resultMessage, setResultMessage] = useState("");

  const fetchRandomPair = async () => {
    setLoading(true);
    setError(null);
    setImageData(null);
    setResultMessage("");

    try {
      const response = await fetch("/api/getRandomPair");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (!data.success)
        throw new Error(data.error || "Failed to fetch image pair");

      setImageData({
        metadata: data.metadata,
        nasaImageUrl: `/api/getImageA?id=${data.nasaImageId}`,
        aiImageUrl: `/api/getImageB?id=${data.aiImageId}`,
      });

      setIsNasaFirst(Math.random() > 0.5);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPair();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-white">
      {loading && <p className="text-xl text-yellow-400">Loading...</p>}
      {error && <p className="text-xl text-red-500">{error}</p>}

      <h1 className="text-4xl font-bold text-center text-yellow-400 md:text-5xl">
        NASA or AI: The Challenge
      </h1>

      <div className="flex flex-col w-full max-w-3xl gap-4">
        {/* Instruction Section */}
        <div className="p-6 text-lg text-center bg-gray-800 rounded-md shadow-lg">
          <strong>Instructions:</strong> Choose the image you think is the real
          NASA Photo of the Day. Click on the photo to select it, and when
          you're ready, hit the "Submit" button below. Good luck!
        </div>

        {/* Game Board Section */}
        <GameBoard
          imageData={imageData}
          isNasaFirst={isNasaFirst}
          fetchRandomPair={fetchRandomPair} // Pass function to reset the game for next round
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import ImagePair from "./ImagePair";
import PlayButtons from "./PlayButtons";
import ImageData from "./ImageData";

const GameBoard = ({ imageData, isNasaFirst, fetchRandomPair }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleImageClick = (imageType) => setSelectedImage(imageType);

  const handleSubmit = () => {
    if (selectedImage === "nasa") {
      setResultMessage("🎉 Correct! You identified the real NASA image!");
    } else {
      setResultMessage("🚫 Incorrect! That was the AI-generated image.");
    }
    setHasSubmitted(true); // Disable further submissions
  };

  const handleNext = () => {
    setSelectedImage(null); // Reset for next round
    setResultMessage("");
    setHasSubmitted(false); // Enable submission for next round
    fetchRandomPair(); // Fetch new image pair
  };

  return (
    <div className="w-full p-6 rounded-md shadow-lg bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Image Pair */}
        <ImagePair
          nasaImageUrl={imageData.nasaImageUrl}
          aiImageUrl={imageData.aiImageUrl}
          isNasaFirst={isNasaFirst}
          selectedImage={selectedImage}
          handleImageClick={handleImageClick}
        />
        <ImageData metadata={imageData.metadata} />

        {/* Result Message */}
        {resultMessage && (
          <p className="mt-4 text-2xl font-bold text-green-400">
            {resultMessage}
          </p>
        )}

        {/* Play Buttons */}
        <PlayButtons
          selectedImage={selectedImage}
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          hasSubmitted={hasSubmitted}
        />

        {/* Metadata Below the Images */}
      </div>
    </div>
  );
};

export default GameBoard;

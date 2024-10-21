"use client"; // Required for state management

import { useState } from "react";
import ImageData from "./gameComponents/ImageData";
import ImagePair from "./gameComponents/ImagePair";
import PlayButtons from "./gameComponents/PlayButtons";

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
    <div className="p-6 bg-gray-800 rounded-md shadow-lg">
      <div className="flex flex-col items-center justify-center gap-6">
        <ImageData metadata={imageData.metadata} />
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <ImagePair
            nasaImageUrl={imageData.nasaImageUrl}
            aiImageUrl={imageData.aiImageUrl}
            isNasaFirst={isNasaFirst}
            selectedImage={selectedImage}
            handleImageClick={handleImageClick}
          />
        </div>
        <p className="mt-4 text-2xl font-bold text-green-400">
          {resultMessage}
        </p>
        <PlayButtons
          selectedImage={selectedImage}
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          hasSubmitted={hasSubmitted} // Prevent resubmission after correct guess
        />
      </div>
    </div>
  );
};

export default GameBoard;

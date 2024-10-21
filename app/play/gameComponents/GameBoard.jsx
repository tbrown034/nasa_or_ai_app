"use client";

import { useState } from "react";
import ImagePair from "./ImagePair";
import PlayButtons from "./PlayButtons";
import ImageData from "./ImageData";

const GameBoard = ({ imageData, isNasaFirst, fetchRandomPair }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // Correct or incorrect state
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the user submitted

  // Handle the image click (selection)
  const handleImageClick = (imageType) => {
    if (!hasSubmitted) {
      // Only allow selection before submission
      setSelectedImage(imageType);
    }
  };

  // Check correctness of the selected image
  const handleSubmit = () => {
    if (selectedImage) {
      const isCorrectChoice = selectedImage === "nasa"; // Check if correct
      setIsCorrect(isCorrectChoice); // Set correct/incorrect state
      setHasSubmitted(true); // Lock the submission
    }
  };

  const handleNext = () => {
    setSelectedImage(null); // Reset for next round
    setIsCorrect(null); // Reset correctness
    setHasSubmitted(false); // Enable submission for next round
    fetchRandomPair(); // Load new image pair
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
          isCorrect={isCorrect} // Pass down correctness state
          hasSubmitted={hasSubmitted} // Pass submission state
        />
        <ImageData metadata={imageData.metadata} />

        {/* Result Message */}
        {hasSubmitted && (
          <p
            className={`mt-4 text-2xl font-bold ${
              isCorrect ? "text-green-400" : "text-red-400"
            }`}
          >
            {isCorrect
              ? "🎉 Correct! You identified the real NASA image!"
              : "🚫 Incorrect! That was the AI-generated image."}
          </p>
        )}

        {/* Play Buttons */}
        <PlayButtons
          selectedImage={selectedImage}
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          hasSubmitted={hasSubmitted}
        />
      </div>
    </div>
  );
};

export default GameBoard;

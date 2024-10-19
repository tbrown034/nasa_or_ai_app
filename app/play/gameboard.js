import { useState } from "react";
import ImageData from "./gameComponents/ImageData";
import ImagePair from "./gameComponents/ImagePair";
import PlayButtons from "./gameComponents/PlayButtons";

const GameBoard = ({ imageData, isNasaFirst, fetchRandomPair }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false); // New state for correct guess

  const handleImageClick = (imageType) => setSelectedImage(imageType);

  const handleSubmit = () => {
    if (selectedImage === "nasa") {
      setResultMessage("🎉 Correct! You identified the real NASA image!");
      setHasGuessedCorrectly(true); // User guessed correctly
    } else {
      setResultMessage("🚫 Incorrect! That was the AI-generated image.");
      setHasGuessedCorrectly(false); // Incorrect guess, allow resubmission
    }
    setHasSubmitted(true); // Disable further submissions for this round
  };

  const handleNext = () => {
    setSelectedImage(null); // Reset the selected image
    setResultMessage(""); // Clear the result message
    setHasSubmitted(false); // Allow submit again for the next round
    setHasGuessedCorrectly(false); // Reset correct guess state for new round
    fetchRandomPair(); // Fetch new image pair
  };

  return (
    <div className="p-6 bg-gray-800 rounded-md shadow-lg">
      {imageData && (
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Display Image Metadata */}
          <ImageData metadata={imageData.metadata} />

          {/* Image Pair (NASA vs AI) */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <ImagePair
              nasaImageUrl={imageData.nasaImageUrl}
              aiImageUrl={imageData.aiImageUrl}
              isNasaFirst={isNasaFirst}
              selectedImage={selectedImage}
              handleImageClick={handleImageClick}
            />
          </div>

          {/* Display Result Message */}
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
            hasGuessedCorrectly={hasGuessedCorrectly} // Pass the correct guess state
          />
        </div>
      )}
    </div>
  );
};

export default GameBoard;

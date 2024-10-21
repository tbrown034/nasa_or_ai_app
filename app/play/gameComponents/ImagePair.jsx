import LoadingSpinner from "@/app/UI/LoadingSpinner";
import Image from "next/image";
import { useState } from "react";

const ImagePair = ({
  nasaImageUrl,
  aiImageUrl,
  isNasaFirst,
  selectedImage,
  handleImageClick,
  isCorrect, // Add this prop for correct/incorrect state
  hasSubmitted, // Add this prop for submission state
}) => {
  const [nasaImageLoaded, setNasaImageLoaded] = useState(false);
  const [aiImageLoaded, setAiImageLoaded] = useState(false);

  const aspectRatio = "1/1"; // Aspect ratio for square images (changeable)

  const imageContainerClass =
    "relative cursor-pointer transition-transform duration-300 ease-in-out";

  // NASA Image Component
  const nasaImage = (
    <div
      key="nasa"
      onClick={() => !hasSubmitted && handleImageClick("nasa")} // Disable clicking after submission
      className={`${imageContainerClass} ${
        hasSubmitted && selectedImage === "nasa"
          ? isCorrect
            ? "border-4 border-green-500 transform scale-105" // Green border for correct NASA image
            : "border-4 border-red-500 transform scale-105" // Red border for incorrect selection
          : selectedImage === "nasa"
          ? "border-4 border-yellow-500 transform scale-105" // Yellow border when selected
          : "border-2 border-white" // Neutral border
      } w-full md:w-1/2`}
      style={{ aspectRatio }}
    >
      <Image
        src={nasaImageUrl}
        alt="NASA Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={() => setNasaImageLoaded(true)}
        className="object-cover rounded-lg"
      />
      {!nasaImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );

  // AI Image Component
  const aiImage = (
    <div
      key="ai"
      onClick={() => !hasSubmitted && handleImageClick("ai")} // Disable clicking after submission
      className={`${imageContainerClass} ${
        hasSubmitted && selectedImage === "ai"
          ? !isCorrect
            ? "border-4 border-red-500 transform scale-105" // Red border for incorrect selection
            : "border-4 border-green-500 transform scale-105" // Green border for correct AI image (if selected incorrectly)
          : selectedImage === "ai"
          ? "border-4 border-yellow-500 transform scale-105" // Yellow border when selected
          : "border-2 border-white" // Neutral border
      } w-full md:w-1/2`}
      style={{ aspectRatio }}
    >
      <Image
        src={aiImageUrl}
        alt="AI Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={() => setAiImageLoaded(true)}
        className="object-cover rounded-lg"
      />
      {!aiImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {/* Gray out incorrect image */}
      {hasSubmitted && isCorrect === false && selectedImage !== "ai" && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full gap-8 md:flex-row">
      {isNasaFirst ? nasaImage : aiImage}
      {isNasaFirst ? aiImage : nasaImage}
    </div>
  );
};

export default ImagePair;

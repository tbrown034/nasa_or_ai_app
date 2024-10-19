// components/Play.js
"use client";
import { useEffect, useState } from "react";
import ImagePair from "./components/ImagePair";
import PlayButtons from "./components/PlayButtons";
import ImageData from "./components/ImageData";

export default function Play() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNasaFirst, setIsNasaFirst] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultMessage, setResultMessage] = useState("");

  const fetchRandomPair = async () => {
    setLoading(true);
    setError(null);
    setImageData(null);
    setSelectedImage(null);
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

  const handleImageClick = (imageType) => setSelectedImage(imageType);

  const handleSubmit = () => {
    if (selectedImage === "nasa") {
      setResultMessage("🎉 Correct! You identified the real NASA image!");
    } else {
      setResultMessage("🚫 Incorrect! That was the AI-generated image.");
    }
  };

  const handleNext = () => fetchRandomPair();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white ">
      {loading && <p className="text-xl text-yellow-400">Loading...</p>}
      {error && <p className="text-xl text-red-500">{error}</p>}

      <h1 className="text-4xl font-bold text-center text-yellow-400 md:text-5xl">
        NASA or AI: The Challenge
      </h1>

      <div className="w-full max-w-3xl">
        {/* Instruction Section */}
        <div className="p-6 mb-8 text-lg text-center bg-gray-800 rounded-md shadow-lg">
          <strong>Instructions:</strong> Choose the image you think is the real
          NASA Photo of the Day. Click on the photo to select it, and when
          you're ready, hit the "Submit" button below. Good luck!
        </div>

        {/* Image Data, Image Pair, and Play Buttons */}
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
            </div>
          )}

          {/* Play Buttons */}
          <PlayButtons
            selectedImage={selectedImage}
            resultMessage={resultMessage}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

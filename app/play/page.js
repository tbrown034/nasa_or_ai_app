"use client";

import { useEffect, useState } from "react";
import ImagePair from "./components/ImagePair";
import ImageData from "./components/ImageData";
import PlayButtons from "./components/PlayButtons"; // Import PlayButtons component

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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch random image pair");
      }

      setImageData({
        metadata: data.metadata,
        nasaImageUrl: `/api/getImageA?id=${data.nasaImageId}`,
        aiImageUrl: `/api/getImageB?id=${data.aiImageId}`,
      });

      setIsNasaFirst(Math.random() > 0.5);
    } catch (err) {
      console.error("Error fetching random pair:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPair();
  }, []);

  const handleImageClick = (imageType) => {
    setSelectedImage(imageType);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      if (selectedImage === "nasa") {
        setResultMessage(
          "Congratulations! You correctly identified the NASA image."
        );
      } else {
        setResultMessage("Wrong choice! The AI image was selected.");
      }
    }
  };

  const handleNext = () => {
    fetchRandomPair();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-4xl font-bold">NASA or AI: The Challenge</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {imageData && (
        <div className="flex flex-col items-center">
          <ImageData metadata={imageData.metadata} />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ImagePair
              nasaImageUrl={imageData.nasaImageUrl}
              aiImageUrl={imageData.aiImageUrl}
              isNasaFirst={isNasaFirst}
              selectedImage={selectedImage}
              handleImageClick={handleImageClick}
            />
          </div>

          <PlayButtons
            handleSubmit={handleSubmit}
            handleNext={handleNext}
            selectedImage={selectedImage}
            resultMessage={resultMessage}
          />
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import ImagePair from "./components/ImagePair"; // Assuming you have ImagePair already created
import PlayButtons from "./components/PlayButtons"; // Play buttons separated for cleaner code
import ImageData from "./components/ImageData"; // For displaying image metadata
import { Audiowide } from "next/font/google"; // Using Audiowide for retro font

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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

      setIsNasaFirst(Math.random() > 0.5); // Randomize image order
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
      setResultMessage("You correctly identified the NASA image!");
    } else {
      setResultMessage("Wrong choice! The AI image was selected.");
    }
  };

  const handleNext = () => fetchRandomPair();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className={`text-4xl text-yellow-300 mb-6 ${audiowide.className}`}>
        NASA or AI: The Challenge
      </h1>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {imageData && (
        <div className="flex flex-col items-center">
          <ImageData metadata={imageData.metadata} />

          {/* Image Pair Component */}
          <div className="flex gap-8 mt-6">
            <ImagePair
              nasaImageUrl={imageData.nasaImageUrl}
              aiImageUrl={imageData.aiImageUrl}
              isNasaFirst={isNasaFirst}
              selectedImage={selectedImage}
              handleImageClick={handleImageClick}
            />
          </div>

          {/* Play Buttons Component */}
          <PlayButtons
            selectedImage={selectedImage}
            resultMessage={resultMessage}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </div>
      )}
    </div>
  );
}

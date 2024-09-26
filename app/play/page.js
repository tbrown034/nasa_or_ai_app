"use client";

import { useEffect, useState } from "react";

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
        nasaUrl: data.nasaUrl,
        aiImageUrl: `data:image/png;base64,${Buffer.from(
          data.aiImageData
        ).toString("base64")}`,
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

  const renderImagePair = () => {
    const imageClass = "object-cover w-full h-full rounded-lg";
    const selectedClass = "border-4 border-blue-500 transform scale-105";
    const unselectedClass =
      selectedImage === "nasa" || selectedImage === "ai" ? "opacity-50" : "";

    const nasaImage = (
      <div
        key="nasa"
        onClick={() => handleImageClick("nasa")}
        className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
          selectedImage === "nasa" ? selectedClass : unselectedClass
        }`}
        style={{ width: "400px", height: "400px" }}
      >
        <img src={imageData.nasaUrl} alt="NASA Image" className={imageClass} />
        {selectedImage === "nasa" && (
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
            Selected
          </div>
        )}
      </div>
    );

    const aiImage = (
      <div
        key="ai"
        onClick={() => handleImageClick("ai")}
        className={`relative cursor-pointer transition-all duration-300 ease-in-out ${
          selectedImage === "ai" ? selectedClass : unselectedClass
        }`}
        style={{ width: "400px", height: "400px" }}
      >
        <img src={imageData.aiImageUrl} alt="AI Image" className={imageClass} />
        {selectedImage === "ai" && (
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
            Selected
          </div>
        )}
      </div>
    );

    return isNasaFirst ? [nasaImage, aiImage] : [aiImage, nasaImage];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-4xl font-bold">NASA or AI: The Challenge</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {imageData && (
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-2xl font-bold">
            {imageData.metadata.title}
          </h2>
          <p className="mb-2 italic text-gray-400">
            Date: {imageData.metadata.date}
          </p>
          <p className="mb-4 text-gray-100">{imageData.metadata.explanation}</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {renderImagePair()}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedImage}
            className="px-4 py-2 mt-6 text-white bg-purple-600 rounded hover:bg-purple-500"
          >
            Submit
          </button>

          {resultMessage && (
            <p className="mt-4 text-2xl font-bold">{resultMessage}</p>
          )}

          <button
            onClick={handleNext}
            className="px-4 py-2 mt-4 text-white bg-yellow-600 rounded hover:bg-yellow-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

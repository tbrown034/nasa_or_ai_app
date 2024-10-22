"use client";

import { useState } from "react";

export default function NasaVsAiPage() {
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNasaFirst, setIsNasaFirst] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [showFullExplanation, setShowFullExplanation] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const RATE_LIMIT_INTERVAL = 10000;

  const fetchApod = async (endpoint) => {
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_INTERVAL) {
      setError("Please wait a bit before making another request.");
      return;
    }

    setLastRequestTime(now);
    setLoading(true);
    setError(null);
    setApodData(null);
    setAiImageUrl(null);
    setSelectedImage(null);
    setResultMessage("");
    setShowFullExplanation(false);
    setSaveMessage("");

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.media_type === "video") {
        fetchApod("/api/nasaApod?count=1");
        return;
      }

      setApodData(data);

      const aiResponse = await fetch("/api/generateAiImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata: data }),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to generate AI image");
      }

      const aiData = await aiResponse.json();
      setAiImageUrl(aiData.imageUrl);
      setIsNasaFirst(Math.random() > 0.5);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTodayClick = () => fetchApod("/api/nasaApod");
  const handleRandomClick = () => fetchApod("/api/nasaApod?count=1");
  const handleImageClick = (imageType) => setSelectedImage(imageType);

  const handleSubmit = () => {
    if (selectedImage) {
      setResultMessage(
        selectedImage === "nasa"
          ? "Congratulations! You correctly identified the NASA image."
          : "Wrong choice! The AI image was selected."
      );
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveNasaVsAi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: apodData,
          nasaUrl: apodData.url,
          aiImageUrl,
        }),
      });

      const result = await response.json();
      setSaveMessage(
        result.success
          ? "NASA vs AI data saved successfully!"
          : "Failed to save data."
      );
    } catch (error) {
      setSaveMessage("Error saving data.");
    }
  };

  const handleNext = () => fetchApod("/api/nasaApod?count=1");

  const renderImagePair = () => {
    const imageClass = "object-cover w-full h-full rounded-lg shadow-lg";
    const selectedClass =
      "border-4 border-blue-500 transform scale-105 shadow-xl";
    const unselectedClass = "opacity-50";

    const nasaImage = (
      <div
        key="nasa"
        onClick={() => handleImageClick("nasa")}
        className={`relative cursor-pointer transition-transform duration-300 ease-in-out ${
          selectedImage === "nasa" ? selectedClass : unselectedClass
        }`}
        style={{ width: "350px", height: "350px" }}
      >
        <img src={apodData.url} alt="NASA APOD" className={imageClass} />
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
        className={`relative cursor-pointer transition-transform duration-300 ease-in-out ${
          selectedImage === "ai" ? selectedClass : unselectedClass
        }`}
        style={{ width: "350px", height: "350px" }}
      >
        <img src={aiImageUrl} alt="AI Generated" className={imageClass} />
        {selectedImage === "ai" && (
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
            Selected
          </div>
        )}
      </div>
    );

    return isNasaFirst ? [nasaImage, aiImage] : [aiImage, nasaImage];
  };

  const renderExplanation = () => {
    const explanationText = apodData?.explanation || "";
    const words = explanationText.split(" ");
    const shortExplanation = words.slice(0, 200).join(" ");
    const hasMore = words.length > 200;

    return (
      <div>
        <p className="mb-4 text-lg text-gray-300">
          {showFullExplanation ? explanationText : shortExplanation}
          {hasMore && !showFullExplanation && (
            <button
              onClick={() => setShowFullExplanation(true)}
              className="ml-2 text-blue-500 hover:underline"
            >
              Read More
            </button>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 py-10 text-white ">
      <h1 className="mb-4 text-5xl font-bold">NASA vs AI</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={handleTodayClick}
          className="px-6 py-2 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Today
        </button>
        <button
          onClick={handleRandomClick}
          className="px-6 py-2 font-semibold text-white transition-all bg-green-600 rounded-lg hover:bg-green-500"
        >
          Random
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {apodData && aiImageUrl && (
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-3xl font-bold text-yellow-300">
            {apodData.title}
          </h2>
          <p className="mb-2 italic text-gray-400">Date: {apodData.date}</p>

          {renderExplanation()}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {renderImagePair()}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedImage}
            className="px-6 py-3 mt-6 text-lg font-semibold text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-500 disabled:bg-gray-600"
          >
            Submit
          </button>

          {resultMessage && (
            <p className="mt-4 text-2xl font-bold text-green-400">
              {resultMessage}
            </p>
          )}

          <button
            onClick={handleSave}
            className="px-6 py-3 mt-4 text-lg font-semibold text-white transition-all bg-yellow-600 rounded-lg hover:bg-yellow-500"
          >
            Save to Database
          </button>

          {saveMessage && (
            <p className="mt-4 text-lg font-bold text-green-400">
              {saveMessage}
            </p>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 mt-4 text-lg font-semibold text-white transition-all bg-yellow-600 rounded-lg hover:bg-yellow-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

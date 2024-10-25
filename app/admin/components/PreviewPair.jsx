// app/admin/components/PreviewPair.jsx

"use client";

import { useState } from "react";

const PreviewPair = ({ apodData, aiImageUrl, saveToDatabase }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Limit description to 100 words
  const getLimitedDescription = (text) => {
    const words = text.split(" ");
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="w-full p-6 rounded-md shadow-lg bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Image Display */}
        <div className="flex space-x-6">
          {/* Display NASA Image */}
          {apodData?.url && (
            <div className="text-center">
              <img
                src={apodData.url}
                alt="NASA APOD"
                style={{ width: "350px", height: "350px", objectFit: "cover" }}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm font-semibold text-gray-300">
                NASA APOD Image
              </p>
            </div>
          )}
          {/* Display AI-Generated Image */}
          {aiImageUrl && (
            <div className="text-center">
              <img
                src={aiImageUrl}
                alt="AI Generated Image"
                style={{ width: "350px", height: "350px", objectFit: "cover" }}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm font-semibold text-gray-300">
                AI Generated Image
              </p>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="w-full p-4 mt-4 text-left bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-yellow-300">
            NASA APOD Metadata
          </h3>
          <p className="mt-2 text-sm text-gray-200">
            <strong>Title:</strong> {apodData.title || "N/A"}
          </p>
          <p className="mt-1 text-sm text-gray-200">
            <strong>Date:</strong> {apodData.date || "N/A"}
          </p>
          <p className="mt-2 text-sm text-gray-200">
            <strong>Description:</strong>{" "}
            {showFullDescription
              ? apodData.explanation
              : getLimitedDescription(apodData.explanation)}
            {apodData.explanation.split(" ").length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="ml-2 text-blue-500 hover:underline"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={saveToDatabase}
            className="px-6 py-2 font-semibold text-white transition-all bg-green-600 rounded-lg hover:bg-green-500"
          >
            Save to Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPair;

"use client";

import { useEffect, useState } from "react";

export default function ShowImage() {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/api/generateImage");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.imageUrl) {
          setImageData(data.imageUrl);
        } else {
          throw new Error("No image URL found in response");
        }
      } catch (err) {
        console.error("Fetch image error:", err);
        setError(err.message);
      }
    };

    fetchImage();
  }, []);

  const handleSaveImage = async () => {
    try {
      const response = await fetch("/api/saveImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imageData }),
      });

      const result = await response.json();
      if (result.success) {
        setSaveMessage("Image saved successfully!");
      } else {
        setSaveMessage("Failed to save image.");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      setSaveMessage("Error saving image.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-3xl font-bold">Generated Image</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : imageData ? (
        <>
          <img
            src={imageData}
            alt="Generated AI"
            className="object-contain w-96 h-96"
          />
          <button
            onClick={handleSaveImage}
            className="p-2 mt-4 text-white bg-blue-600 rounded"
          >
            Save Image to Database
          </button>
          {saveMessage && <p className="mt-2">{saveMessage}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

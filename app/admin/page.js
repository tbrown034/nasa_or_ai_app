"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getImages");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fetch images error:", err);
        setError(err.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-3xl font-bold">Admin Page - Saved Images</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${Buffer.from(
                image.image_data
              ).toString("base64")}`}
              alt={`Saved AI Image ${index}`}
              className="object-contain w-96 h-96"
            />
          ))}
        </div>
      )}
    </div>
  );
}

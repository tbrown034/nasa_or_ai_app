"use client";

import { useEffect, useState } from "react";

export default function ApodPage() {
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch("/api/nasaApod");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setApodData(data);
      } catch (err) {
        console.error("Fetch APOD error:", err);
        setError(err.message);
      }
    };

    fetchApod();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!apodData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-4xl font-bold">{apodData.title}</h1>
      {apodData.url && (
        <img
          src={apodData.url}
          alt={apodData.title}
          className="object-contain w-full max-w-2xl mb-4 rounded shadow-lg"
        />
      )}
      {apodData.copyright && (
        <p className="mb-2 italic text-gray-500">© {apodData.copyright}</p>
      )}
      <p className="text-lg">{apodData.explanation}</p>
    </div>
  );
}

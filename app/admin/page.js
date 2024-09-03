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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-3xl font-bold">Admin Page - Saved Images</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-blue-800">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Date Added</th>
                <th className="px-4 py-2">Explanation</th>
                <th className="px-4 py-2">Copyright</th>
                <th className="px-4 py-2">NASA Image</th>
                <th className="px-4 py-2">AI Image</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{image.title}</td>
                  <td className="px-4 py-2 border">{image.date}</td>
                  <td className="px-4 py-2 border">
                    {image.date_time_added || "N/A"}
                  </td>
                  <td className="max-w-xs px-4 py-2 border">
                    {image.explanation.length > 100 ? (
                      <>
                        {image.explanation.substring(0, 100)}...
                        <button className="text-blue-500 hover:underline">
                          Read More
                        </button>
                      </>
                    ) : (
                      image.explanation
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.copyright || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.nasa_image_url && (
                      <img
                        src={image.nasa_image_url}
                        alt="NASA Image"
                        className="object-cover w-16 h-16"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.ai_image_data && (
                      <img
                        src={`data:image/png;base64,${Buffer.from(
                          image.ai_image_data
                        ).toString("base64")}`}
                        alt="AI Image"
                        className="object-cover w-16 h-16"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

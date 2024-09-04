"use client";

import { useEffect, useState } from "react";

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AdminPage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [selectedImage, setSelectedImage] = useState(null); // For modal image

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getAll");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Fetch images error:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Loading ends when the data is fetched
      }
    };

    fetchImages();
  }, []);

  // Delete handler with confirmation
  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId }), // Send imageId in the body
      });

      if (!response.ok) {
        throw new Error("Failed to delete image.");
      }

      // Filter out the deleted image from the state
      setImages(images.filter((image) => image.id !== imageId));
      alert("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Error deleting image.");
    }
  };

  // Render the loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl text-white">Loading Admin Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold text-white">Admin Dashboard</h1>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto">
          <table className="min-w-full text-white bg-gray-800">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Date Added</th>
                <th className="px-4 py-2">Explanation</th>
                <th className="px-4 py-2">Copyright</th>
                <th className="px-4 py-2">NASA Image</th>
                <th className="px-4 py-2">AI Image</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr
                  key={image.metadata_id}
                  className="transition-all hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border">{image.metadata_id}</td>
                  <td className="px-4 py-2 border">{image.title}</td>
                  <td className="px-4 py-2 border">
                    {image.date ? formatDate(image.date) : "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.date_time_added
                      ? formatDate(image.date_time_added)
                      : "N/A"}
                  </td>
                  <td className="max-w-xs px-4 py-2 border">
                    {image.explanation.split(" ").length > 50 ? (
                      <>
                        {image.explanation.split(" ").slice(0, 50).join(" ")}...
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() =>
                            setImages((prev) =>
                              prev.map((img) =>
                                img.metadata_id === image.metadata_id
                                  ? {
                                      ...img,
                                      showFullExplanation:
                                        !img.showFullExplanation,
                                    }
                                  : img
                              )
                            )
                          }
                        >
                          {image.showFullExplanation
                            ? "Show Less"
                            : "Read More"}
                        </button>
                        {image.showFullExplanation && (
                          <p>{image.explanation}</p>
                        )}
                      </>
                    ) : (
                      image.explanation
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.copyright || "NASA"}
                  </td>
                  <td className="px-4 py-2 border">
                    {image.nasa_image_url && (
                      <img
                        src={image.nasa_image_url}
                        alt="NASA Image"
                        className="object-cover w-16 h-16 rounded cursor-pointer"
                        onClick={() => setSelectedImage(image.nasa_image_url)} // Open modal
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
                        className="object-cover w-16 h-16 rounded cursor-pointer"
                        onClick={() => setSelectedImage(image.ai_image_data)} // Open modal
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-400"
                      onClick={() => handleDelete(image.metadata_id)}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative p-4 bg-white rounded-lg">
            <button
              className="absolute text-black top-2 right-2"
              onClick={() => setSelectedImage(null)} // Close modal on click
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Large view"
              className="max-w-full max-h-full border-4 border-gray-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}

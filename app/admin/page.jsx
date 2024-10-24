"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/UI/LoadingSpinner"; // Custom spinner component
import { audiowide } from "@/app/utils/fonts";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL; // Set admin email in .env.local

  // Protect the admin page, redirect non-admins
  if (status === "loading") return <p>Loading...</p>;
  if (!session || session.user.email !== adminEmail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className={`text-4xl text-white ${audiowide.className}`}>
          Access Denied
        </h1>
      </div>
    );
  }

  // Fetch the database table data
  const loadTable = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getAll");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setImages(data); // Store data
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete image by ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteImage?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete image.");
      setImages((prevImages) =>
        prevImages.filter((image) => image.metadata_id !== id)
      ); // Remove deleted image
    } catch (err) {
      setError(err.message);
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    loadTable();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Admin Header */}
      <h1
        className={`mb-8 text-5xl font-bold text-yellow-300 ${audiowide.className}`}
      >
        Admin Dashboard
      </h1>

      {/* Navigation Links */}
      <div className="flex flex-col w-full max-w-md gap-6 mb-12">
        <Link
          className="w-full px-6 py-3 text-lg font-semibold text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500"
          href="/profile"
        >
          Back to Profile
        </Link>
        <Link
          className="w-full px-6 py-3 text-lg font-semibold text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500"
          href="/nasaVsAi"
        >
          Generate Pair
        </Link>
        <Link
          className="w-full px-6 py-3 text-lg font-semibold text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500"
          href="/database"
        >
          View Database
        </Link>
      </div>

      {/* Error or Loading State */}
      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner /> {/* Show spinner while loading */}
          <p className="mt-4 text-lg text-white">Loading data...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        /* Table of Images */
        <table className="min-w-full text-white bg-gray-800 rounded-lg">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Explanation</th>
              <th className="px-4 py-2">NASA Image</th>
              <th className="px-4 py-2">AI Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.metadata_id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border border-gray-600">
                  {image.metadata_id}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {image.title}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {image.date}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {image.date_time_added}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {image.explanation}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <img
                    src={image.nasa_image_url}
                    alt="NASA"
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <img
                    src={`data:image/png;base64,${Buffer.from(
                      image.ai_image_data
                    ).toString("base64")}`}
                    alt="AI"
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    onClick={() => handleDelete(image.metadata_id)}
                    className="px-2 py-1 text-red-500 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

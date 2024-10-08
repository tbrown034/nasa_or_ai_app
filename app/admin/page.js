"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Protect the admin page
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

  const loadTable = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getAll");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error("Fetch images error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Admin Header */}
      <h1
        className={`mb-8 text-4xl font-bold text-white ${audiowide.className}`}
      >
        Admin Dashboard
      </h1>

      {/* Links to Other Pages */}
      <div className="flex flex-col gap-4 mb-12">
        <Link
          className="px-4 py-2 text-lg text-white border-2 border-white rounded-md hover:bg-gray-700"
          href="/profile"
        >
          Back to Profile
        </Link>
        <Link
          className="px-4 py-2 text-lg text-white border-2 border-white rounded-md hover:bg-gray-700"
          href="/apod"
        >
          Show APOD
        </Link>
        <Link
          className="px-4 py-2 text-lg text-white border-2 border-white rounded-md hover:bg-gray-700"
          href="/random"
        >
          Show Random APOD
        </Link>
        <Link
          className="px-4 py-2 text-lg text-white border-2 border-white rounded-md hover:bg-gray-700"
          href="/nasaVsAi"
        >
          NASA vs AI
        </Link>
        <button
          className="px-4 py-2 text-lg text-white border-2 border-white rounded-md hover:bg-gray-700"
          onClick={loadTable}
        >
          View Database
        </button>
      </div>

      {/* Error or Loading States */}
      {loading && <p className="text-xl text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Table of Images */}
      {images.length > 0 && (
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

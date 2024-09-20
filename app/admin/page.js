"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Start loading as false
  const [selectedImage, setSelectedImage] = useState(null);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Protect the admin page - only render for the correct user
  if (status === "loading") return <p>Loading...</p>;
  if (!session || session.user.email !== adminEmail) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-white">Access Denied</h1>
      </div>
    );
  }

  const loadTable = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getAll");
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-4xl font-bold text-white">Admin Dashboard</h1>
      <Link
        className="p-2 border-2 border-white rounded hover:bg-blue-500"
        href="/profile"
      >
        Back to Profile
      </Link>

      <div className="mt-4">
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500"
          href="/apod"
        >
          Show APOD
        </Link>
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500"
          href="/random"
        >
          Show Random APOD
        </Link>
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500"
          href="/nasaVsAi"
        >
          NASA vs AI
        </Link>
        <button
          className="p-2 border-2 border-white rounded hover:bg-blue-500"
          onClick={loadTable}
        >
          View Database
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {images.length > 0 && (
        <table className="min-w-full mt-4 text-white bg-blue-700 rounded-xl">
          <thead>
            <tr className="border rounded-xl">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Date Added</th>
              <th className="px-4 py-2 border">Explanation</th>
              <th className="px-4 py-2 border">NASA Image</th>
              <th className="px-4 py-2 border">AI Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.metadata_id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border">{image.metadata_id}</td>
                <td className="px-4 py-2 border">{image.title}</td>
                <td className="px-4 py-2 border">{image.date}</td>
                <td className="px-4 py-2 border">{image.date_time_added}</td>
                <td className="px-4 py-2 border">{image.explanation}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={image.nasa_image_url}
                    alt="NASA"
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <img
                    src={`data:image/png;base64,${Buffer.from(
                      image.ai_image_data
                    ).toString("base64")}`}
                    alt="AI"
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(image.metadata_id)}
                    className="text-red-500"
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

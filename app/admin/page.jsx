"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import AdminTable from "./components/AdminTable";
import PreviewPair from "./components/PreviewPair";
import { audiowide } from "@/app/utils/fonts";
import Modal from "@/app/UI/Modal"; // Import the Modal component

// Utility to format date to "YYYY-MM-DD"
const formatDate = (date) => date.toISOString().split("T")[0];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // New state for delete loading

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateStatus, setDateStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Check admin authentication
  if (status === "loading") return <LoadingSpinner />;
  if (!session || session.user.email !== adminEmail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className={`text-4xl text-red-500 ${audiowide.className}`}>
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
      setImages(data);
      setIsTableLoaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if entry exists for the selected date
  const checkDateStatus = async (date) => {
    try {
      const formattedDate = formatDate(date);
      const response = await fetch(`/api/checkEntry?date=${formattedDate}`);
      const result = await response.json();

      if (result.success) {
        if (result.exists) {
          setDateStatus("exists");
          setStatusMessage("A pair already exists for this date.");
          setStatusColor("text-green-400");
        } else {
          setDateStatus("not-exists");
          setStatusMessage("No pair exists for this date.");
          setStatusColor("text-red-400");
        }
      } else {
        setError("Failed to check date status");
      }
    } catch (error) {
      setError("Error checking date status");
    }
  };

  // Handle manual date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    checkDateStatus(date);
  };

  // Navigate to previous or next day
  const changeDay = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
    checkDateStatus(newDate);
  };

  // Generate a NASA vs AI Pair for the selected date
  const generatePair = async () => {
    setLoading(true);
    setError(null);
    setIsPreview(false);

    try {
      const formattedDate = formatDate(selectedDate);

      // Fetch the NASA APOD data for the selected date
      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch APOD for date: ${formattedDate}`);
      }

      const fetchedApodData = await response.json();
      if (!fetchedApodData.url) {
        throw new Error("NASA APOD URL is missing.");
      }

      // Generate an AI image based on the APOD metadata
      const aiResponse = await fetch("/api/generateAiImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata: fetchedApodData }),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to generate AI image");
      }

      const aiData = await aiResponse.json();

      // Set fetched data to state for preview
      setApodData(fetchedApodData);
      setAiImageUrl(aiData.imageUrl);
      setIsPreview(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save the generated pair to the database
  const saveToDatabase = async () => {
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
      if (result.success) {
        setIsPreview(false);
        alert("Pair saved successfully!");
        checkDateStatus(selectedDate);
      } else {
        throw new Error("Failed to save to database");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Random Date Fetch
  const fetchRandomDate = () => {
    const randomDate = new Date(
      new Date().getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
    );
    setSelectedDate(randomDate);
    checkDateStatus(randomDate);
  };

  // Handle the delete button click (open modal)
  const confirmDelete = (imageId) => {
    setImageToDelete(imageId);
    setIsModalOpen(true);
  };

  // Actual deletion function
  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const response = await fetch("/api/deleteImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId: imageToDelete }),
      });

      const result = await response.json();
      if (result.success) {
        // Remove the deleted image from the state
        setImages(
          images.filter((image) => image.metadata_id !== imageToDelete)
        );
        alert("Image deleted successfully!");
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsModalOpen(false); // Close the modal
      setImageToDelete(null); // Clear the selected image
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 space-y-8 bg-transparent">
      <h1
        className={`text-5xl font-bold text-yellow-300 ${audiowide.className} neon-glow`}
      >
        Admin Dashboard
      </h1>

      {/* Date Picker and Controls */}
      <div className="w-full max-w-md p-4 space-y-4 rounded-lg shadow-lg bg-opacity-80 bg-black/10">
        <div className="flex items-center justify-center space-x-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            onClick={() => changeDay(-1)}
            className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-500 rounded-md shadow-md hover:bg-blue-400 hover:scale-105"
          >
            Previous Day
          </button>
          <button
            onClick={() => changeDay(1)}
            className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-500 rounded-md shadow-md hover:bg-blue-400 hover:scale-105"
          >
            Next Day
          </button>
          <button
            onClick={fetchRandomDate}
            className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-400 rounded-md shadow-md hover:bg-blue-300 hover:scale-105"
          >
            Random Day
          </button>
        </div>
      </div>

      {/* Generate Pair Button */}
      <div className="w-full max-w-md">
        <button
          onClick={generatePair}
          className="w-full px-6 py-3 text-lg font-semibold text-white transition-transform transform bg-blue-800 rounded-lg shadow-md hover:bg-yellow-500 hover:scale-105"
        >
          Generate Pair
        </button>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <p className={`text-lg font-bold ${statusColor} mt-4 text-center`}>
          {statusMessage}
        </p>
      )}

      {loading ? (
        <div className="flex flex-col items-center mt-6">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-white">Loading data...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        isPreview && (
          <PreviewPair
            apodData={apodData}
            aiImageUrl={aiImageUrl}
            saveToDatabase={saveToDatabase}
          />
        )
      )}

      {/* Button to Load Database Table */}
      <div className="w-full max-w-md mt-8">
        <button
          onClick={loadTable}
          className="w-full px-6 py-3 text-lg font-semibold text-white transition-all bg-blue-900 rounded-lg shadow-md hover:bg-blue-950"
        >
          Load Database
        </button>
      </div>

      {/* Table Display */}
      {isTableLoaded && <AdminTable images={images} onDelete={confirmDelete} />}

      {/* Modal for delete confirmation */}
      <Modal
        title="Confirm Delete"
        content={
          deleteLoading ? (
            <LoadingSpinner /> // Show spinner if deleting
          ) : (
            "Are you sure you want to delete this image? This action cannot be undone."
          )
        }
        primaryAction={handleDelete}
        primaryLabel="Delete"
        secondaryAction={() => setIsModalOpen(false)}
        secondaryLabel="Cancel"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

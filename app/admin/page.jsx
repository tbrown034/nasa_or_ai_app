"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import AdminTable from "./components/AdminTable";
import PreviewPair from "./components/PreviewPair";
import { audiowide } from "@/app/utils/fonts";
import Modal from "@/app/UI/Modal";

const formatDate = (date) => date.toISOString().split("T")[0];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [showAddPairs, setShowAddPairs] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateStatus, setDateStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

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

  // Function to check if an entry exists for the selected date
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

  // useEffect to check today's date status on load
  useEffect(() => {
    checkDateStatus(selectedDate);
  }, [selectedDate]);

  const toggleAddPairs = () => {
    setShowAddPairs(!showAddPairs);
    setShowTable(false);
  };

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowAddPairs(false);
    if (!isTableLoaded) loadTable();
  };

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    checkDateStatus(date); // Check status immediately when date changes
  };

  const generatePair = async () => {
    setLoading(true);
    setError(null);
    setIsPreview(false);

    try {
      const formattedDate = formatDate(selectedDate);
      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok)
        throw new Error(`Failed to fetch APOD for date: ${formattedDate}`);
      const fetchedApodData = await response.json();

      const aiResponse = await fetch("/api/generateAiImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: fetchedApodData }),
      });
      if (!aiResponse.ok) throw new Error("Failed to generate AI image");
      const aiData = await aiResponse.json();

      setApodData(fetchedApodData);
      setAiImageUrl(aiData.imageUrl);
      setIsPreview(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async () => {
    try {
      const response = await fetch("/api/saveNasaVsAi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        checkDateStatus(selectedDate); // Update date status after saving
      } else throw new Error("Failed to save to database");
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDelete = (imageId) => {
    setImageToDelete(imageId);
    setIsModalOpen(true);
  };

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
      setIsModalOpen(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 space-y-8 bg-transparent">
      <h1
        className={`text-5xl font-bold text-yellow-300 ${audiowide.className} neon-glow`}
      >
        Admin Dashboard
      </h1>

      {/* Main Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={toggleAddPairs}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-400"
        >
          {showAddPairs ? "Close Add Pairs" : "Add Pairs Manually"}
        </button>
        <button
          onClick={toggleTable}
          className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-500"
        >
          {showTable ? "Hide Table" : "View Table"}
        </button>
      </div>

      {/* Add Pairs Section */}
      {showAddPairs && (
        <div className="w-full max-w-md p-4 space-y-4 rounded-lg shadow-lg bg-opacity-80 bg-black/10">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md focus:outline-none"
          />
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() =>
                handleDateChange(
                  new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                )
              }
              className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-500 rounded-md shadow-md hover:bg-blue-400 hover:scale-105"
            >
              Previous Day
            </button>
            <button
              onClick={() =>
                handleDateChange(
                  new Date(selectedDate.setDate(selectedDate.getDate() + 1))
                )
              }
              className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-500 rounded-md shadow-md hover:bg-blue-400 hover:scale-105"
            >
              Next Day
            </button>
            <button
              onClick={generatePair}
              className="w-1/3 px-4 py-2 text-sm text-white transition-transform transform bg-blue-800 rounded-md shadow-md hover:bg-yellow-500 hover:scale-105"
            >
              Generate Pair
            </button>
          </div>

          {statusMessage && (
            <p className={`text-lg font-bold ${statusColor} mt-4 text-center`}>
              {statusMessage}
            </p>
          )}
          {isPreview && (
            <PreviewPair
              apodData={apodData}
              aiImageUrl={aiImageUrl}
              saveToDatabase={saveToDatabase}
            />
          )}
        </div>
      )}

      {/* Table Display */}
      {showTable && !loading && isTableLoaded && (
        <AdminTable images={images} onDelete={confirmDelete} />
      )}

      {/* Loading and Error Messages */}
      {loading && (
        <div className="flex flex-col items-center mt-6">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-white">Loading data...</p>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Modal for Delete Confirmation */}
      <Modal
        title="Confirm Delete"
        content="Are you sure you want to delete this image? This action cannot be undone."
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

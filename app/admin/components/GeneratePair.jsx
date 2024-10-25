// app/admin/components/GeneratePairSection.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import PreviewPair from "./PreviewPair";

const formatDate = (date) => format(date, "yyyy-MM-dd");

const GeneratePair = ({
  selectedDate,
  dateStatus,
  checkDateStatus,
  setError,
}) => {
  const [savingPair, setSavingPair] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [apodData, setApodData] = useState(null); // APOD data state
  const [aiImageUrl, setAiImageUrl] = useState(null); // AI image URL state
  const [isPreview, setIsPreview] = useState(false); // Preview visibility

  // Generate a NASA vs AI Pair for the selected date
  const generatePair = async () => {
    setSavingPair(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const formattedDate = formatDate(selectedDate);

      // Check if an entry already exists for the selected date
      if (dateStatus === "exists") {
        setError("A pair already exists for this date.");
        setSavingPair(false);
        return;
      }

      // Fetch the NASA APOD data for the selected date
      const response = await fetch(`/api/nasaApod?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch APOD for date: ${formattedDate}`);
      }

      const fetchedApodData = await response.json();
      console.log("Fetched APOD data:", fetchedApodData);

      // Check if the URL is valid
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
      setIsPreview(true); // Show the preview
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingPair(false);
    }
  };

  // Save the pair to the database
  const handleSave = async () => {
    try {
      const saveResponse = await fetch("/api/saveNasaVsAi", {
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

      const saveResult = await saveResponse.json();
      if (saveResult.success) {
        setSuccessMessage("Pair generated and saved successfully!");
        checkDateStatus(selectedDate);
        setIsPreview(false); // Hide the preview after saving
      } else {
        setError("Failed to save the generated pair.");
      }
    } catch (error) {
      setError("Error saving the pair.");
    }
  };

  // Reject the pair (reset state)
  const handleReject = () => {
    setApodData(null);
    setAiImageUrl(null);
    setIsPreview(false);
  };

  return (
    <div className="mb-6">
      {isPreview ? (
        <PreviewPair
          apodData={apodData}
          aiImageUrl={aiImageUrl}
          handleSave={handleSave}
          handleReject={handleReject}
        />
      ) : (
        <button
          onClick={generatePair}
          disabled={savingPair}
          className="px-6 py-3 text-lg font-semibold text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-500 disabled:bg-gray-500"
        >
          {savingPair ? "Generating..." : "Generate Pair"}
        </button>
      )}
      {successMessage && (
        <p className="mt-4 text-lg font-bold text-green-400">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default GeneratePair;

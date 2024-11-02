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
  const [apodData, setApodData] = useState(null);
  const [aiImageUrl, setAiImageUrl] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  // Get today's date for comparison
  const today = new Date();

  // Generate a NASA vs AI Pair for the selected date
  const generatePair = async () => {
    setSavingPair(true);
    setSuccessMessage(null);
    setError(null);

    try {
      // Check if selected date is beyond today
      if (selectedDate > today) {
        setError("Cannot generate a pair for a future date.");
        setSavingPair(false);
        return;
      }

      const formattedDate = formatDate(selectedDate);

      if (dateStatus === "exists") {
        setError("A pair already exists for this date.");
        setSavingPair(false);
        return;
      }

      const response = await fetch(`/api/getNasaApod?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch APOD for date: ${formattedDate}`);
      }

      const fetchedApodData = await response.json();

      if (!fetchedApodData.url) {
        throw new Error("NASA APOD URL is missing.");
      }

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

      setApodData(fetchedApodData);
      setAiImageUrl(aiData.imageUrl);
      setIsPreview(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingPair(false);
    }
  };

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
        setIsPreview(false);
      } else {
        setError("Failed to save the generated pair.");
      }
    } catch (error) {
      setError("Error saving the pair.");
    }
  };

  const handleReject = () => {
    setApodData(null);
    setAiImageUrl(null);
    setIsPreview(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg p-6 mx-auto space-y-4 rounded-lg shadow-lg bg-black/10 bg-opacity-80">
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
          className={`px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:bg-purple-500 disabled:bg-gray-500 ${
            savingPair ? "animate-pulse" : ""
          }`}
        >
          {savingPair ? "Generating..." : "Generate Pair"}
        </button>
      )}

      {successMessage && (
        <p className="mt-4 text-lg font-semibold text-green-400 neon-glow">
          {successMessage}
        </p>
      )}
      {setError && (
        <p className="mt-4 text-lg font-semibold text-red-500">{setError}</p>
      )}
    </div>
  );
};

export default GeneratePair;

export default function PlayButtons({
  selectedImage,
  resultMessage,
  handleSubmit,
  handleNext,
}) {
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedImage}
        className={`px-8 py-4 mb-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 ${
          !selectedImage ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        Submit
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-8 py-4 mt-4 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 hover:scale-105"
      >
        Next
      </button>
      {/* Result Message */}
      {resultMessage && (
        <p className="mt-4 text-xl font-bold text-green-400">{resultMessage}</p>
      )}
    </div>
  );
}

const PlayButtons = ({ selectedImage, handleSubmit, handleNext }) => {
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedImage}
        className={`px-8 py-4 mb-4 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 ${
          !selectedImage ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        Submit
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-8 py-4 mt-4 text-black transition-all duration-300 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105"
      >
        Next
      </button>
    </div>
  );
};

export default PlayButtons;

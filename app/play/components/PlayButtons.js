// app/play/components/PlayButtons.js
const PlayButtons = ({
  handleSubmit,
  handleNext,
  selectedImage,
  resultMessage,
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleSubmit}
        disabled={!selectedImage}
        className="px-4 py-2 mt-6 text-white bg-purple-600 rounded hover:bg-purple-500"
      >
        Submit
      </button>

      <button
        onClick={handleNext}
        className="px-4 py-2 mt-4 text-white bg-yellow-600 rounded hover:bg-yellow-500"
      >
        Next
      </button>
      {resultMessage && (
        <p className="mt-4 text-2xl font-bold">{resultMessage}</p>
      )}
    </div>
  );
};

export default PlayButtons;

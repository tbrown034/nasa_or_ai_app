import { useState } from "react";

const ImageData = ({ metadata }) => {
  const [showMore, setShowMore] = useState(false);

  // Format the date to "MM/DD/YYYY"
  const formattedDate = new Date(metadata.date).toLocaleDateString("en-US");

  // Truncate the explanation to 200 characters
  const maxLength = 400;
  const truncatedExplanation = metadata.explanation.slice(0, maxLength);

  // Toggle the "Show more" state
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="text-center">
      <h2 className="mb-2 text-2xl font-bold">{metadata.title}</h2>
      <p className="mb-2 italic text-gray-400">Date: {formattedDate}</p>

      <p className="mb-4 text-gray-100">
        {showMore
          ? metadata.explanation
          : `${truncatedExplanation}${
              metadata.explanation.length > maxLength ? "..." : ""
            }`}

        {metadata.explanation.length > maxLength && (
          <span
            onClick={handleShowMore}
            className="ml-2 text-blue-500 underline cursor-pointer hover:text-blue-700"
          >
            {showMore ? "Show less" : "Show more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ImageData;

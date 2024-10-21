import { useState } from "react";

const ImageData = ({ metadata }) => {
  const [showMore, setShowMore] = useState(false);

  const formattedDate = new Date(metadata.date).toLocaleDateString("en-US");
  const maxLength = 200;
  const truncatedExplanation = metadata.explanation.slice(0, maxLength);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full mt-4 text-center">
      <h2 className="mb-2 text-2xl font-bold text-yellow-300">
        Astronomy Picture of the Day: {metadata.title}
      </h2>
      <p className="mb-2 italic text-gray-300">Date: {formattedDate}</p>

      <p className="mb-4 text-gray-100">
        {showMore
          ? metadata.explanation
          : `${truncatedExplanation}${
              metadata.explanation.length > maxLength ? "..." : ""
            }`}
        {metadata.explanation.length > maxLength && (
          <span
            onClick={handleShowMore}
            className="ml-2 text-blue-400 underline cursor-pointer hover:text-blue-600"
          >
            {showMore ? "Show less" : "Show more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ImageData;

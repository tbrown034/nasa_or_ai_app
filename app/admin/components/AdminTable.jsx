import React from "react";

// Function to format dates as "MM/DD/YYYY" (e.g., "9/19/2024")
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Function to limit explanation text to 100 characters
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const AdminTable = ({ images, onDelete }) => {
  return (
    <div className="mt-6">
      <table className="min-w-full text-white bg-gray-800 rounded-lg">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Date Added</th>
            <th className="px-4 py-2">Explanation</th>
            <th className="px-4 py-2">NASA Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.metadata_id} className="hover:bg-gray-700">
              <td className="px-4 py-2 border border-gray-600">
                {image.metadata_id}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {image.title}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {formatDate(image.date)}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {formatDate(image.date_time_added)}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {truncateText(image.explanation, 100)}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <img
                  src={image.nasa_image_url}
                  alt="NASA"
                  className="object-cover w-16 h-16" // Limit image size
                />
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <button
                  onClick={() => onDelete(image.metadata_id)}
                  className="px-2 py-1 text-red-500 bg-gray-100 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

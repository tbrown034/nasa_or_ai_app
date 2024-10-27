import React from "react";

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
            <th className="px-4 py-2">AI Image</th>
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
              <td className="px-4 py-2 border border-gray-600">{image.date}</td>
              <td className="px-4 py-2 border border-gray-600">
                {image.date_time_added}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {image.explanation}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <img
                  src={image.nasa_image_url}
                  alt="NASA"
                  className="w-16 h-16"
                />
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    image.ai_image_data
                  ).toString("base64")}`}
                  alt="AI"
                  className="w-16 h-16"
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

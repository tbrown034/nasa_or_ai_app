// app/admin/error.jsx
"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl text-red-500">Something went wrong!</h1>
      <p className="text-lg text-gray-300">Error: {error.message}</p>
      <button
        onClick={() => reset()} // Triggers a retry (re-renders the segment)
        className="px-4 py-2 text-black bg-yellow-400 rounded-lg"
      >
        Retry
      </button>
      <button
        onClick={() => (window.location.href = "/")} // Navigate back to home
        className="px-4 py-2 text-white bg-gray-600 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
}

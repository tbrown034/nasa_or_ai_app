// app/error.jsx

"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl text-red-500">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-300">Error: {error.message}</p>
      <button
        onClick={() => reset()} // Retry logic to re-render the page
        className="px-4 py-2 text-black bg-yellow-400 rounded-lg"
      >
        Retry
      </button>
    </div>
  );
}

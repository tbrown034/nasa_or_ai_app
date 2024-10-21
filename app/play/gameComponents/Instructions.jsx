import React from "react";

export default function Instructions() {
  return (
    <div className="w-full max-w-3xl p-4 text-center rounded-md shadow-lg bg-gradient-to-b from-gray-800 to-gray-900">
      <h2 className="text-xl font-bold text-yellow-400">Instructions</h2>
      <p className="text-lg text-gray-300">
        Select the real NASA image from the two options below. Click to select,
        then hit <span className="font-bold text-yellow-400">"Submit"</span>.
        After your guess, press{" "}
        <span className="font-bold text-yellow-400">"Next"</span> to try again
        with a new pair of images!
      </p>
    </div>
  );
}

import React from "react";
import { audiowide } from "@/app/utils/fonts";

export default function Modal({
  title,
  content,
  primaryAction,
  primaryLabel,
  secondaryAction,
  secondaryLabel,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="p-6 space-y-6 bg-indigo-900 rounded-lg shadow-lg w-80">
        {/* Title */}
        <h2
          className={`text-lg font-semibold text-yellow-300 ${audiowide.className}`}
        >
          {title}
        </h2>

        {/* Content */}
        <div className="text-gray-200">{content}</div>

        {/* Buttons */}
        <div className="flex justify-between">
          {/* Primary Action Button */}
          <button
            onClick={primaryAction}
            className={`px-4 py-2 text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition ${audiowide.className}`}
          >
            {primaryLabel}
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={secondaryAction || onClose}
            className={`px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition ${audiowide.className}`}
          >
            {secondaryLabel || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

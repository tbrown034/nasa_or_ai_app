// app/loading.jsx

import { ArrowPathIcon } from "@heroicons/react/24/solid";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ArrowPathIcon className="w-16 h-16 text-yellow-400 animate-spin" />
      <p className="ml-4 text-2xl text-yellow-300">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

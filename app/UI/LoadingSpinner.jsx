import { ArrowPathIcon } from "@heroicons/react/24/solid";

// Centralized loading spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ArrowPathIcon className="w-16 h-16 text-yellow-400 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;

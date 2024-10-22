// app/admin/loading.jsx
import LoadingSpinner from "../UI/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner />
      <p className="mt-4 text-lg text-white">Loading Admin Data...</p>
    </div>
  );
}

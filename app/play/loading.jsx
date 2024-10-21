// app/play/loading.jsx
import LoadingSpinner from "../UI/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}

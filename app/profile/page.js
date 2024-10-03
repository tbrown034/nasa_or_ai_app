"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Audiowide } from "next/font/google";

// Import the retro font for titles and buttons
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Profile = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Fetch user data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        setLoading(true);
        try {
          const response = await fetch("/api/getUserData");
          if (!response.ok) throw new Error("Failed to fetch user data");
          const user = await response.json();
          setUserData(user);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className={`text-4xl text-yellow-300 ${audiowide.className}`}>
          Loading...
        </h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className={`text-4xl text-yellow-300 ${audiowide.className}`}>
          You must be logged in to view this page.
        </h1>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1
        className={`mb-4 text-4xl font-bold text-yellow-300 ${audiowide.className}`}
      >
        Welcome, {session.user.name}!
      </h1>
      <p className="mb-4 text-xl text-gray-300">This is your profile page.</p>

      {/* Admin Link */}
      {isAdmin && (
        <Link
          href="/admin"
          className="px-6 py-2 mb-4 text-xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
        >
          Go to Admin Page
        </Link>
      )}

      {/* Display user data if available */}
      {userData && (
        <div className="p-4 mb-4 text-white bg-gray-800 rounded-lg">
          <img
            src={userData.image}
            alt="User Avatar"
            className="w-16 h-16 mb-4 rounded-full"
          />
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Date Added:</strong>{" "}
            {new Date(userData.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Sign Out Button */}
      <button
        onClick={toggleModal}
        className="px-6 py-2 text-xl font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Sign Out
      </button>

      {/* Sign Out Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Are you sure you want to sign out?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

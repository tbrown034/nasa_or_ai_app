"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL; // Check admin

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>You must be logged in to view this page.</h1>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-4xl font-bold">Welcome, {session.user.name}!</h1>
      <p className="mb-4">This is your profile page.</p>

      {isAdmin && (
        <Link
          href="/admin"
          className="px-6 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go to Admin Page
        </Link>
      )}

      <button
        onClick={toggleModal}
        className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Sign Out
      </button>

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

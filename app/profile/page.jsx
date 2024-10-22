"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { audiowide } from "@/app/utils/fonts";
import Modal from "../UI/Modal"; // Import your new Modal component

const Profile = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching user data

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Fetch user data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch("/api/getUserData");
          const user = await response.json();
          setUserData(user);
        } finally {
          setLoading(false); // Stop loading after data is fetched
        }
      }
    };
    fetchUserData();
  }, [session]);

  // Handle no session (user not logged in)
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className={`text-4xl text-yellow-300 ${audiowide.className}`}>
          You must be logged in to view this page.
        </h1>
      </div>
    );
  }

  // Handle sign out action
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-6">
      <div className="flex flex-col items-center gap-2">
        <h1
          className={`mb-4 text-4xl font-bold text-yellow-300 ${audiowide.className}`}
        >
          Welcome, {session.user.name}!
        </h1>
        <p className="mb-4 text-xl text-gray-300">This is your profile page.</p>

        {isAdmin && (
          <Link
            href="/admin"
            className="px-6 py-2 mb-4 text-xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
          >
            Go to Admin Page
          </Link>
        )}
      </div>

      {userData && (
        <div className="p-8 text-center bg-gray-900 rounded-lg shadow-lg">
          <img
            src={userData.image}
            alt="User Avatar"
            className="w-32 h-32 mx-auto mb-4 border-4 border-yellow-300 rounded-full"
          />
          <p className="mb-2 text-xl text-white">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="mb-2 text-xl text-white">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-xl text-white">
            <strong>Date Added:</strong>{" "}
            {new Date(userData.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      <button
        onClick={toggleModal}
        className="px-6 py-3 mt-6 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Sign Out
      </button>

      {/* Reusable Modal */}
      <Modal
        title="Are you sure you want to sign out?"
        content="By signing out, you will need to log back in to access your profile."
        primaryAction={handleSignOut}
        primaryLabel="Yes, Sign Out"
        secondaryLabel="Cancel"
        isOpen={showModal}
        onClose={toggleModal} // Use the toggle function to close the modal
      />
    </div>
  );
};

export default Profile;

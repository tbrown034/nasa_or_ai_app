"use client"; // This makes the component a Client Component

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const { data: session } = useSession(); // Use useSession hook to track login status
  const [loading, setLoading] = useState(false); // For handling the loading state

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google"); // Signing in with Google
    setLoading(false);
  };

  if (session) {
    // If user is signed in, display signed-in status and Sign out button
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2 text-white">
          Signed in as {session.user.name || session.user.email}
        </p>
        <button
          onClick={() => signOut()} // Sign out function
          className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-gray-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  // If user is not signed in, show the sign-in button
  return (
    <button
      onClick={handleSignIn}
      className={`p-2 text-white bg-blue-500 rounded ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}

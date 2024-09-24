"use client";

import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useSession, signIn } from "next-auth/react";

export default function LogInButton() {
  const router = useRouter(); // Initialize useRouter for client-side navigation
  const { data: session } = useSession();

  if (session) {
    // If user is already signed in, redirect to the profile page
    router.push("/profile");
    return null; // Return null to prevent rendering the login form
  }

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/profile" }); // Redirect to profile after successful login
  };

  return (
    <button
      onClick={handleSignIn}
      className="p-2 text-white bg-blue-500 rounded"
    >
      Sign in with Google
    </button>
  );
}

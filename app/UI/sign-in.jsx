"use client";

import { useRouter } from "next/navigation"; // Import the useRouter hook
import { useSession, signIn } from "next-auth/react";
import { Audiowide } from "next/font/google"; // Import the Audiowide font

// Apply the Audiowide font for the button
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function SignIn() {
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
    <div className="flex items-center justify-center min-h-screen p-6">
      <button
        onClick={handleSignIn}
        className="p-16 text-xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
      >
        Sign in with Google
      </button>
    </div>
  );
}

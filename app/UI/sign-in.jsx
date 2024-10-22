// app/UI/sign-in.jsx
"use client"; // Necessary for useSession and navigation hooks

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { audiowide } from "@/app/utils/fonts";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo"; // Assuming Logo is a component for your branding/logo

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Handle redirection if already signed in
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ArrowPathIcon className="w-12 h-12 text-yellow-300 animate-spin" />
        <p className="mt-4 text-lg text-yellow-300">Loading...</p>
      </div>
    );
  }

  if (session) {
    router.push("/profile");
    return null;
  }

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/profile" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6 text-center">
      {/* Branding or Logo */}
      <Logo />

      {/* Heading */}
      <h1
        className={`text-5xl font-bold text-yellow-300 ${audiowide.className}`}
      >
        Welcome to NASA or Not
      </h1>

      {/* Login Button */}
      <button
        onClick={handleSignIn}
        className={`px-10 py-4 mt-8 text-2xl font-bold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400 transition duration-300 ${audiowide.className}`}
      >
        Sign in with Google
      </button>

      {/* Subtitle or description */}
      <p className="text-lg text-gray-200">
        Sign in to explore NASA's real images or AI-generated fakes.
      </p>
    </div>
  );
}

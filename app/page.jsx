import Link from "next/link";
import { audiowide } from "@/app/utils/fonts";
import Logo from "./UI/Logo.jsx"; // Ensure the Logo component is imported correctly

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      {/* Title */}
      <h1
        className={`text-center text-yellow-300 tracking-widest text-6xl ${audiowide.className}`}
      >
        NASA or Not
      </h1>

      {/* Logo */}
      <div className="mt-8">
        <Logo />
      </div>

      {/* Description */}
      <p className="max-w-2xl mx-auto text-xl tracking-wider text-center text-gray-200">
        Can you tell the difference between real NASA images and AI-generated
        imposters? Test your skills in this cosmic guessing game!
      </p>

      {/* Play Button */}
      <Link
        className="p-4 mt-8 text-2xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
        href="/play"
      >
        Classic Mode
      </Link>
    </main>
  );
}

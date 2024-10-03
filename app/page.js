import Link from "next/link";
import { Press_Start_2P } from "next/font/google"; // Import font for manual application

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Hero Section with Press Start 2P */}
      <h1
        className={`mb-8 text-center text-yellow-300 text-8xl ${pressStart2P.className}`}
      >
        NASA or Not
      </h1>

      {/* Challenge Description with Press Start 2P */}
      <p
        className={` mb-12 text-2xl tracking-wider text-center text-gray-300 ${pressStart2P.className}`}
      >
        Can you tell the difference between real NASA images and AI-generated
        imposters? Put your skills to the test in a cosmic guessing game!
      </p>

      {/* Game Modes Buttons with Inter (default) */}
      <div className="flex gap-8 mb-12">
        <Link
          className="px-8 py-4 text-2xl font-bold text-black transition-transform transform bg-yellow-300 border-4 border-yellow-300 rounded-lg hover:bg-yellow-400 hover:text-white hover:scale-105"
          href="/play"
        >
          Classic Mode
        </Link>
        <Link
          className="px-8 py-4 text-2xl font-bold text-black transition-transform transform bg-pink-400 border-4 border-pink-400 rounded-lg hover:bg-pink-500 hover:text-white hover:scale-105"
          href="/play"
        >
          Challenge Mode
        </Link>
        <Link
          className="px-8 py-4 text-2xl font-bold text-black transition-transform transform bg-green-400 border-4 border-green-400 rounded-lg hover:bg-green-500 hover:text-white hover:scale-105"
          href="/play"
        >
          Battle Mode
        </Link>
      </div>

      {/* Login/Sign In Button with Inter (default) */}
      <div className="flex gap-4 mt-6">
        <Link
          className="px-8 py-4 text-2xl font-bold text-black transition-transform transform bg-blue-400 border-4 border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white hover:scale-105"
          href="/login"
        >
          Log In / Sign Up
        </Link>
        <Link
          className="px-8 py-4 text-2xl font-bold text-black transition-transform transform bg-blue-400 border-4 border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white hover:scale-105"
          href="/about"
        >
          About
        </Link>
      </div>
    </main>
  );
}

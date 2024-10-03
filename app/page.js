import Link from "next/link";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Hero Section */}
      <h1
        className={`mb-8 text-center text-yellow-300 tracking-widest text-6xl ${audiowide.className}`}
      >
        NASA or Not
      </h1>

      {/* Challenge Description */}
      <p
        className={`mb-12 text-xl tracking-wider text-center text-gray-200 ${audiowide.className}`}
      >
        Can you tell the difference between real NASA images and AI-generated
        imposters? Test your skills in this cosmic guessing game!
      </p>

      {/* Game Modes Buttons */}
      <div className="flex gap-6 mb-10">
        <Link
          className="px-6 py-3 text-xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
          href="/play"
        >
          Classic Mode
        </Link>
        <Link
          className="px-6 py-3 text-xl font-semibold text-black bg-blue-400 rounded-lg hover:bg-blue-600"
          href="/play"
        >
          Challenge Mode
        </Link>
        <Link
          className="px-6 py-3 text-xl font-semibold text-black rounded-lg bg-slate-300 hover:bg-gray-100"
          href="/play"
        >
          Battle Mode
        </Link>
      </div>

      {/* Log In/Sign Up & About Buttons */}
      <div className="flex gap-4 mt-16">
        <Link
          className="px-6 py-3 text-lg font-medium text-white transition-transform transform border-4 border-white rounded-lg hover:bg-white hover:text-black hover:scale-105"
          href="/login"
        >
          Log In / Sign Up
        </Link>
        <Link
          className="px-6 py-3 text-lg font-medium text-white transition-transform transform border-4 border-white rounded-lg hover:bg-white hover:text-black hover:scale-105"
          href="/about"
        >
          About
        </Link>
      </div>
    </main>
  );
}

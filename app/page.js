import Link from "next/link";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1
        className={`text-center text-yellow-300 tracking-widest text-6xl ${audiowide.className}`}
      >
        NASA or Not
      </h1>
      <p className="text-xl tracking-wider text-center text-gray-200">
        Can you tell the difference between real NASA images and AI-generated
        imposters? Test your skills in this cosmic guessing game!
      </p>
      <Link
        className="p-4 text-2xl font-semibold text-black bg-yellow-300 rounded-lg hover:bg-yellow-400"
        href="/play"
      >
        Classic Mode
      </Link>
    </main>
  );
}

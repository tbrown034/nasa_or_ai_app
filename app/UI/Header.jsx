"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Major_Mono_Display, Audiowide } from "next/font/google"; // Import fonts

// Major Mono Display for the title
const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Audiowide for the links and buttons
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Links = () => (
  <div
    className={`hidden gap-6  xl:text-2xl lg:text-xl text-white  sm:flex ${audiowide.className}`}
  >
    <Link href="/play" className="transition hover:text-gray-400">
      Play Now
    </Link>
    <Link
      href="https://apod.nasa.gov/apod/archivepix.html"
      className="transition hover:text-gray-400"
    >
      NASA Picture of the Day Archive
    </Link>
    <Link href="/about" className="transition hover:text-gray-400">
      About
    </Link>
  </div>
);

const Header = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="flex items-center justify-between py-4">
      {/* "NASA or Not" with Major Mono Display */}
      <Link
        href="/"
        className={`text-4xl font-bold text-yellow-300 hover:text-yellow-400 tracking-wider ${audiowide.className}`}
      >
        NASA or Not
      </Link>

      {/* Middle Links with Audiowide */}
      <Links />

      {/* Profile/Login with Audiowide and improved button styling */}
      <div className="flex gap-4">
        {session ? (
          <>
            <Link
              href="/profile"
              className="p-2 ml-auto text-xl text-black transition-transform transform bg-yellow-300 border-2 border-yellow-300 rounded-xl hover:bg-yellow-400 hover:text-white hover:scale-105"
            >
              Profile
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className={`p-2 text-white border-2 border-pink-300 rounded-xl bg-pink-400 hover:bg-pink-500 hover:text-white transition-transform transform hover:scale-105 ${audiowide.className}`}
              >
                Admin
              </Link>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className={`p-2 ml-auto text-white border-2 border-blue-400 rounded-xl bg-blue-400 hover:bg-blue-500 hover:text-white transition-transform transform hover:scale-105 ${audiowide.className}`}
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

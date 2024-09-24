"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Extract the links into constants
const Links = () => (
  <div className="hidden gap-4 text-white sm:flex">
    <Link href="/game" className="transition hover:text-gray-400">
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

  // Check if the user is an admin by comparing the role stored in session
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="flex items-center justify-between py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-400"
      >
        NASA or Not
      </Link>

      {/* Render the extracted Links component */}
      <Links />

      <div className="flex gap-4">
        {session ? (
          <>
            <Link
              href="/profile"
              className="p-2 ml-auto text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800"
            >
              Profile
            </Link>

            {/* Show Admin button if user is an admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="p-2 text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800"
              >
                Admin
              </Link>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="p-2 ml-auto text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

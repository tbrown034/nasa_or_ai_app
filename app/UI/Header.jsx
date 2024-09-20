"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL; // Check admin

  return (
    <nav className="flex items-center justify-between py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-400"
      >
        NASA or Not
      </Link>

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

      <div className="flex gap-4">
        {session ? (
          <>
            <Link
              href="/profile"
              className="p-2 ml-auto text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800"
            >
              Profile
            </Link>
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

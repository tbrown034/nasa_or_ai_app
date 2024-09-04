import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      {/* NASA or Not Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-400"
      >
        NASA or Not
      </Link>

      {/* Middle Links - Hidden on mobile, shown on larger screens */}
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
        <Link
          href="/login"
          className="p-2 ml-auto text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800 active:bg-blue-800 active:text-white sm:ml-0"
        >
          Log In
        </Link>

        <Link
          href="/admin"
          className="p-2 ml-auto text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-800 active:bg-blue-800 active:text-white sm:ml-0"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Header;

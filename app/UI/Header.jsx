"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for menu dropdown

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="flex items-center justify-between p-2">
      {/* Title */}
      <Link
        href="/"
        className="text-3xl font-bold tracking-wider text-yellow-300 sm:text-4xl hover:text-yellow-400"
      >
        NASA or Not
      </Link>

      {/* Middle Links for larger screens */}
      <div className="hidden gap-6 text-white sm:flex xl:text-2xl lg:text-xl">
        <Link href="/play" className="hover:text-gray-400">
          Play
        </Link>
        <Link
          href="https://apod.nasa.gov/apod/archivepix.html"
          className="hover:text-gray-400"
        >
          NASA Picture of the Day
        </Link>
        <Link href="/about" className="hover:text-gray-400">
          About
        </Link>
      </div>

      {/* Profile Icon & Hamburger */}
      <div className="flex items-center gap-4">
        <Link href={session ? "/profile" : "/login"} className="text-white">
          {session ? (
            <UserCircleIconSolid className="w-8 h-8" />
          ) : (
            <UserCircleIcon className="w-8 h-8" />
          )}
        </Link>

        {/* Hamburger Icon (Visible on mobile only) */}
        <button
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          className="text-white sm:hidden"
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute p-4 bg-gray-800 rounded-md shadow-lg top-16 right-4 sm:hidden"
        >
          <Link
            href="/play"
            className="block mb-2 text-lg text-white hover:text-gray-400"
            onClick={toggleMenu}
          >
            Play
          </Link>
          <Link
            href="https://apod.nasa.gov/apod/archivepix.html"
            className="block mb-2 text-lg text-white hover:text-gray-400"
            onClick={toggleMenu}
          >
            NASA Picture of the Day
          </Link>
          <Link
            href="/about"
            className="block text-lg text-white hover:text-gray-400"
            onClick={toggleMenu}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;

"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-17.5 w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] relative z-50">
      
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold text-sky-600 tracking-tight">
        Tutora
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
        <li><Link href="#" className="hover:text-gray-500/80 transition">Home</Link></li>
        <li><Link href="#" className="hover:text-gray-500/80 transition">Services</Link></li>
        <li><Link href="#" className="hover:text-gray-500/80 transition">Portfolio</Link></li>
        <li><Link href="#" className="hover:text-gray-500/80 transition">Pricing</Link></li>
      </ul>

      {/* Desktop Button */}
      <button className="hidden md:inline w-40 h-11 rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition">
        Get started
      </button>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        onClick={() => setOpen(!open)}
        className="md:hidden active:scale-90 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M3 7h24M3 15h24M3 23h24"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-17.5 left-0 w-full bg-white border-t p-6 md:hidden transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 text-sm font-medium">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Portfolio</Link></li>
          <li><Link href="#">Pricing</Link></li>
        </ul>

        <button className="mt-6 w-40 h-11 rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition">
          Get started
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
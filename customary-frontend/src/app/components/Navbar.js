'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-2 px-2">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          {/* Example SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="15" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
            <path d="M10 18l6-6 6 6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <rect x="11" y="18" width="10" height="6" rx="2" fill="#2563eb" />
          </svg>
          <span className="text-lg font-bold text-blue-600 tracking-tight">
            LegalBond
          </span>
        </div>
        <div className="space-x-1 flex flex-wrap items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium text-xs px-1 py-0.5">
            Home
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium text-xs px-1 py-0.5">
            Sign Up
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium text-xs px-1 py-0.5">
            Login
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium text-xs px-1 py-0.5">
            About
          </Link>
        </div>
        <div className="flex flex-wrap justify-center space-x-1">
          <Link href="/registerM">
            <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
              Register
            </button>
          </Link>
          <Link href="/viewmarriage">
            <button className="bg-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300">
              Registrations
            </button>
          </Link>
          <Link href="/objection">
            <button className="bg-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300">
              Objection
            </button>
          </Link>
          <Link href="/viewobjection">
            <button className="bg-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300">
              Objections
            </button>
          </Link>
          <Link href="/approved">
            <button className="bg-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300">
              Approved
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
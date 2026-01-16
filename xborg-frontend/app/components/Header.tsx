"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold">
            xborg
          </Link>
          <nav className="hidden gap-3 text-sm md:flex">
            <Link href="/signin" className="text-gray-600 hover:text-gray-900">
              Signin
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              Profile
            </Link>
          </nav>
        </div>
        <div className="text-sm">
          <Link href="/signin" className="px-3 py-1 rounded bg-blue-600 text-white">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

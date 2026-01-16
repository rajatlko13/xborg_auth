"use client";
import React from 'react';

export default function SigninPage() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow bg-white">
        <h1 className="text-2xl mb-4">Sign in</h1>
        <a
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
          href={`${backend}/auth/login/google`}
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );
}

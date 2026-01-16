"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Token is set as an httpOnly cookie by the backend. Just redirect to profile.
    router.replace('/profile');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow bg-white text-center">
        {error ? <p className="text-red-600">{error}</p> : <p>Signing in…</p>}
      </div>
    </div>
  );
}

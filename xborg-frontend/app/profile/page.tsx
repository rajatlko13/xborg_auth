"use client";
import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  bio?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    // Use cookie-based auth; backend sets httpOnly cookie on login.
    fetch(`${backend}/user/profile`, { credentials: 'include' })
      .then((r) => {
        if (r.status === 401) throw new Error('Unauthorized');
        return r.json();
      })
      .then((data) => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
        // redirect to signin on auth failure
        setTimeout(() => (window.location.href = '/signin'), 800);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const body = { name: user.name, bio: user.bio };
    try {
      const res = await fetch(`${backend}/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setUser(data.user);
      alert('Saved');
    } catch (err) {
      alert('Save failed');
    }
  };

  if (loading) return <div className="p-8">Loading…</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!user) return <div className="p-8">No user</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSave} className="p-8 rounded shadow bg-white w-full max-w-md">
        <h1 className="text-2xl mb-4">Profile</h1>
        {user.avatar && <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded mb-4" />}
        <div className="mb-2">
          <label className="block text-sm">Name</label>
          <input value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full border px-2 py-1" />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Email</label>
          <input value={user.email || ''} readOnly className="w-full border px-2 py-1 bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Bio</label>
          <textarea value={user.bio || ''} onChange={(e) => setUser({ ...user, bio: e.target.value })} className="w-full border px-2 py-1" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          <button
            type="button"
            onClick={async () => {
              try {
                await fetch(`${backend}/auth/logout`, { credentials: 'include' });
              } catch (e) {
                // ignore
              }
              window.location.href = '/signin';
            }}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Sign out
          </button>
        </div>
      </form>
    </div>
  );
}

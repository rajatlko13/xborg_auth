import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-10 shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">xborg — Profile demo</h1>
        <p className="text-sm text-gray-600 mb-6">Sign in to view and edit your profile.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</Link>
          <Link href="/profile" className="px-4 py-2 border rounded">Profile</Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-5xl font-extrabold text-white">404</h1>
      <p className="text-neutral-400">This page could not be found.</p>
      <Link href="/" className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-semibold">Back to home</Link>
    </div>
  );
}

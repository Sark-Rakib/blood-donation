import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🩸</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Donor Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">The donor you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link
        href="/donors"
        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
      >
        ← Back to Donors
      </Link>
    </div>
  );
}

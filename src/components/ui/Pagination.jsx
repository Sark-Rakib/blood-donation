'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${baseUrl}?${params.toString()}`);
  }

  const pages = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      {pages[0] > 1 && (
        <>
          <button onClick={() => goToPage(1)} className="w-10 h-10 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">1</button>
          {pages[0] > 2 && <span className="text-gray-400 dark:text-gray-500">...</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-10 h-10 text-sm rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-red-600 text-white border-red-600'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-400 dark:text-gray-500">...</span>}
          <button onClick={() => goToPage(totalPages)} className="w-10 h-10 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{totalPages}</button>
        </>
      )}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

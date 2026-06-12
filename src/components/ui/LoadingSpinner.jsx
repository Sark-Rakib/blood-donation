export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-2 border-gray-200 dark:border-gray-700 border-t-red-600 dark:border-t-red-400 rounded-full animate-spin`}
      />
    </div>
  );
}

export function LoadingSkeleton({ count = 1 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      ))}
    </div>
  );
}

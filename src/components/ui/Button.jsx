export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    secondary: 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-gray-700 active:bg-red-100 dark:active:bg-gray-600',
    danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

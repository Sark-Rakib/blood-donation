const bloodGroupColors = {
  'A+': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'A-': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'B+': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'B-': 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'AB+': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'AB-': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'O+': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'O-': 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold';

  if (children && bloodGroupColors[children]) {
    return (
      <span className={`${base} ${bloodGroupColors[children]} ${className}`}>
        {children}
      </span>
    );
  }

  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

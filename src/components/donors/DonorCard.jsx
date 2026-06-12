import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { formatDate, isEligible } from '@/utils/date';

export default function DonorCard({ donor }) {
  const eligible = isEligible(donor.lastDonationDate);

  return (
    <Link href={`/donors/${donor._id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md hover:border-red-200 dark:hover:border-red-800 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <Badge>{donor.bloodGroup}</Badge>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            eligible
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${eligible ? 'bg-green-500' : 'bg-yellow-500'}`} />
            {eligible ? 'Eligible' : 'Unavailable'}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{donor.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{donor.address}</p>
        <div className="mt-auto pt-3 space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Phone:</span>
            <a
              href={`tel:${donor.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              {donor.phone}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Last Donation:</span>
            <span className="text-gray-700 dark:text-gray-300">{formatDate(donor.lastDonationDate)}</span>
          </div>
          {donor.nextEligibleDate && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Next Eligible:</span>
              <span className={`font-medium ${eligible ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {formatDate(donor.nextEligibleDate)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

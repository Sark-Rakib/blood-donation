import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import DeleteDonorButton from '@/components/donors/DeleteDonorButton';
import { formatDate, isEligible, daysUntil } from '@/utils/date';

async function getDonor(id) {
  await connectDB();
  const donor = await Donor.findById(id).lean({ virtuals: true });
  return donor ? JSON.parse(JSON.stringify(donor)) : null;
}

export default async function DonorDetailsPage({ params }) {
  const { id } = await params;
  const donor = await getDonor(id);

  if (!donor) notFound();

  const eligible = isEligible(donor.lastDonationDate);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/donors"
        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 mb-6 transition-colors"
      >
        ← Back to Donors
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <Badge>{donor.bloodGroup}</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mt-3">{donor.name}</h1>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
              eligible ? 'bg-green-500/20 text-green-100' : 'bg-yellow-500/20 text-yellow-100'
            }`}>
              <span className={`w-2 h-2 rounded-full ${eligible ? 'bg-green-400' : 'bg-yellow-400'}`} />
              {eligible ? 'Available to Donate' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Phone Number</label>
              <a
                href={`tel:${donor.phone}`}
                className="text-lg font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                {donor.phone}
              </a>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Blood Group</label>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{donor.bloodGroup}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Last Donation Date</label>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{formatDate(donor.lastDonationDate)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Next Eligible Date</label>
              <p className={`text-lg font-medium ${eligible ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {donor.nextEligibleDate ? formatDate(donor.nextEligibleDate) : 'N/A'}
                {!eligible && donor.nextEligibleDate && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (in {daysUntil(donor.nextEligibleDate)} days)
                  </span>
                )}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Address</label>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{donor.address}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <a
              href={`tel:${donor.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              📞 Call {donor.phone}
            </a>
            <Link href={`/donors/${donor._id}/edit`}>
              <Button variant="secondary" size="lg">Edit Details</Button>
            </Link>
            <DeleteDonorButton donorId={donor._id} donorName={donor.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

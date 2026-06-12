import DonorListClient from './DonorListClient';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';
import { isEligible } from '@/utils/date';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

async function getDonors(searchParams) {
  await connectDB();
  const search = searchParams.search || '';
  const bloodGroup = searchParams.bloodGroup || '';
  const eligible = searchParams.eligible || '';
  const page = Math.max(1, parseInt(searchParams.page || '1'));
  const limit = 12;

  const query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (bloodGroup) query.bloodGroup = bloodGroup;

  let donors = await Donor.find(query).sort({ createdAt: -1 }).lean({ virtuals: true });

  if (eligible === 'true') {
    donors = donors.filter((d) => isEligible(d.lastDonationDate));
  } else if (eligible === 'false') {
    donors = donors.filter((d) => !isEligible(d.lastDonationDate));
  }

  const total = donors.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedDonors = donors.slice((page - 1) * limit, page * limit);

  return {
    donors: JSON.parse(JSON.stringify(paginatedDonors)),
    pagination: { page, limit, total, totalPages },
    filters: { search, bloodGroup, eligible },
  };
}

export default async function DonorsPage({ searchParams }) {
  const sp = await searchParams;
  const { donors, pagination, filters } = await getDonors(sp);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Find Blood Donors</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Search and filter donors by blood group, name, or eligibility.
        </p>
      </div>

      <DonorListClient
        initialDonors={donors}
        initialPagination={pagination}
        initialFilters={filters}
        bloodGroups={BLOOD_GROUPS}
      />
    </div>
  );
}

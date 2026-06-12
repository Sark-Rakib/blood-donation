'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DonorCard from '@/components/donors/DonorCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Pagination from '@/components/ui/Pagination';

export default function DonorListClient({
  initialDonors,
  initialPagination,
  initialFilters,
  bloodGroups,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialFilters.search);
  const [bloodGroup, setBloodGroup] = useState(initialFilters.bloodGroup);
  const [eligible, setEligible] = useState(initialFilters.eligible);

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (bloodGroup) params.set('bloodGroup', bloodGroup);
    if (eligible) params.set('eligible', eligible);
    params.set('page', '1');
    router.push(`/donors?${params.toString()}`);
  }

  function resetFilters() {
    setSearch('');
    setBloodGroup('');
    setEligible('');
    router.push('/donors');
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-8">
        <div className="grid gap-4 sm:grid-cols-4">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
          <Select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            options={bloodGroups.map((bg) => ({ value: bg, label: bg }))}
            placeholder="All Blood Groups"
          />
          <Select
            value={eligible}
            onChange={(e) => setEligible(e.target.value)}
            options={[
              { value: 'true', label: 'Eligible to Donate' },
              { value: 'false', label: 'Not Eligible' },
            ]}
            placeholder="All Donors"
          />
          <div className="flex gap-2">
            <Button onClick={applyFilters} className="flex-1">Apply</Button>
            <Button variant="secondary" onClick={resetFilters}>Reset</Button>
          </div>
        </div>
        {(initialFilters.search || initialFilters.bloodGroup || initialFilters.eligible) && (
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span>Active filters:</span>
            {initialFilters.search && <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{initialFilters.search}</span>}
            {initialFilters.bloodGroup && <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{initialFilters.bloodGroup}</span>}
            {initialFilters.eligible === 'true' && <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Eligible</span>}
            {initialFilters.eligible === 'false' && <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Not Eligible</span>}
          </div>
        )}
      </div>

      {initialDonors.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {initialDonors.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
          <Pagination
            currentPage={initialPagination.page}
            totalPages={initialPagination.totalPages}
            baseUrl="/donors"
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🩸</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No donors found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {initialFilters.search || initialFilters.bloodGroup || initialFilters.eligible
              ? 'Try adjusting your search filters.'
              : 'Be the first to register as a donor!'}
          </p>
          <Button onClick={() => router.push('/register')}>Register Now</Button>
        </div>
      )}
    </div>
  );
}

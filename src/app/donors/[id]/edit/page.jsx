'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DonorForm from '@/components/donors/DonorForm';
import Card from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditDonorPage({ params }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setId(resolved.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/donors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.donor) {
          setDonor({
            ...data.donor,
            lastDonationDate: data.donor.lastDonationDate
              ? new Date(data.donor.lastDonationDate).toISOString().split('T')[0]
              : '',
          });
        }
      })
      .catch(() => addToast('Failed to load donor', 'error'))
      .finally(() => setLoading(false));
  }, [id, addToast]);

  async function handleSubmit(data) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/donors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        addToast(result.error || 'Failed to update', 'error');
        return;
      }

      addToast('Donor updated successfully!', 'success');
      router.push(`/donors/${id}`);
    } catch {
      addToast('Something went wrong.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Donor not found</h2>
        <Link href="/donors" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-2 inline-block">Back to donors</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/donors/${id}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 mb-6 transition-colors"
      >
        ← Back to Donor Details
      </Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Donor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Update {donor.name}&apos;s information.</p>
      </div>
      <Card className="p-6 sm:p-8">
        <DonorForm
          defaultValues={donor}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />
      </Card>
    </div>
  );
}

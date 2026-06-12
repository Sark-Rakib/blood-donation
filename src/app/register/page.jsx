'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DonorForm from '@/components/donors/DonorForm';
import Card from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data) {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        addToast(result.error || 'Failed to register', 'error');
        return;
      }

      addToast('Donor registered successfully!', 'success');
      router.push(`/donors/${result.donor._id}`);
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Register as a Donor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Join our community and help save lives through blood donation.
        </p>
      </div>
      <Card className="p-6 sm:p-8">
        <DonorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Card>
    </div>
  );
}

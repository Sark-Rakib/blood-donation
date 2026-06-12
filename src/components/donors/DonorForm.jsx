'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donorSchema, donorFormDefaults } from '@/validations/donor';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const bloodGroupOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export default function DonorForm({ defaultValues, onSubmit, isSubmitting, submitLabel = 'Register' }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: defaultValues || donorFormDefaults,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Select
          label="Blood Group"
          placeholder="Select blood group"
          options={bloodGroupOptions}
          error={errors.bloodGroup?.message}
          {...register('bloodGroup')}
        />
        <Input
          label="Phone Number"
          placeholder="+8801XXXXXXXXX"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Last Donation Date"
          type="date"
          error={errors.lastDonationDate?.message}
          {...register('lastDonationDate')}
        />
      </div>
      <Input
        label="Address"
        placeholder="Enter your full address"
        error={errors.address?.message}
        {...register('address')}
      />
      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? 'Submitting...' : submitLabel}
      </Button>
    </form>
  );
}

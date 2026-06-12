import { z } from 'zod';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const donorSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  bloodGroup: z.enum(bloodGroups, {
    errorMap: () => ({ message: 'Please select a valid blood group' }),
  }),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\+?[\d\- ]+$/, 'Invalid phone number format'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  lastDonationDate: z
    .string()
    .min(1, 'Last donation date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
});

export const donorFormDefaults = {
  name: '',
  bloodGroup: '',
  phone: '',
  address: '',
  lastDonationDate: '',
};

import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be at most 100 characters'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Invalid blood group',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
    },
    lastDonationDate: {
      type: Date,
      required: [true, 'Last donation date is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

donorSchema.virtual('nextEligibleDate').get(function () {
  if (!this.lastDonationDate) return null;
  const date = new Date(this.lastDonationDate);
  date.setDate(date.getDate() + 120);
  return date;
});

donorSchema.virtual('isEligible').get(function () {
  if (!this.nextEligibleDate) return false;
  return this.nextEligibleDate <= new Date();
});

export default mongoose.models.Donor || mongoose.model('Donor', donorSchema);

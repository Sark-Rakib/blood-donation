import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';

export async function GET() {
  try {
    await connectDB();
    const donors = await Donor.find({}).lean({ virtuals: true });
    const total = donors.length;

    const now = new Date();
    const available = donors.filter((d) => {
      if (!d.lastDonationDate) return false;
      const nextDate = new Date(d.lastDonationDate);
      nextDate.setDate(nextDate.getDate() + 120);
      return nextDate <= now;
    }).length;

    const bloodGroupCounts = {};
    for (const d of donors) {
      const bg = d.bloodGroup;
      bloodGroupCounts[bg] = (bloodGroupCounts[bg] || 0) + 1;
    }

    const byGroup = Object.entries(bloodGroupCounts)
      .map(([group, count]) => ({ group, count }))
      .sort((a, b) => a.group.localeCompare(b.group));

    return NextResponse.json({ total, available, byGroup });
  } catch (error) {
    console.error('GET /api/stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

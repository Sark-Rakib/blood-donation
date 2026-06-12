import HeroSection from '@/components/layout/HeroSection';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';

async function getStats() {
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

    return { total, available, byGroup };
  } catch {
    return { total: 0, available: 0, byGroup: [] };
  }
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <StatsCard
            label="Total Donors"
            value={stats.total}
            icon="🩸"
            color="red"
          />
          <StatsCard
            label="Available to Donate"
            value={stats.available}
            icon="❤️"
            color="green"
          />
          <StatsCard
            label="Blood Groups"
            value={stats.byGroup.length}
            icon="🏷️"
            color="blue"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blood Group Distribution</h2>
          {stats.byGroup.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.byGroup.map((item) => (
                <div key={item.group} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Badge>{item.group}</Badge>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No donors registered yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

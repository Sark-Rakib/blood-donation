import HeroSection from '@/components/layout/HeroSection';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';

async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/stats`, { cache: 'no-store' });
    if (!res.ok) return { total: 0, available: 0, byGroup: [] };
    return res.json();
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

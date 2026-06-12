'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/stats')
        .then((r) => r.json())
        .then(setStats)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Sign in to access the dashboard.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSignInError('');
              const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
              });
              if (result?.error) {
                setSignInError('Invalid email or password');
              } else {
                router.refresh();
              }
            }}
            className="space-y-4 text-left"
          >
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bloodconnect.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {signInError && (
              <p className="text-sm text-red-600 dark:text-red-400">{signInError}</p>
            )}
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome, {session.user.email}</p>
        </div>
        <Button variant="secondary" onClick={() => signOut()}>Sign Out</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatsCard label="Total Donors" value={stats?.total || 0} icon="🩸" color="red" />
        <StatsCard label="Available Donors" value={stats?.available || 0} icon="❤️" color="green" />
        <StatsCard label="Blood Groups" value={stats?.byGroup?.length || 0} icon="🏷️" color="blue" />
      </div>

      {stats?.byGroup && stats.byGroup.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Blood Group Distribution</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Blood Group</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Count</th>
                </tr>
              </thead>
              <tbody>
                {stats.byGroup.map((item) => (
                  <tr key={item.group} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-3 px-4">
                      <Badge>{item.group}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-gray-100">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}

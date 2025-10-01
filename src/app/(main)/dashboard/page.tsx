import { Suspense } from 'react';
import DashboardPageClient from './DashboardPageClient'; // client component

export default function DashboardPage({ searchParams }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageClient searchParams={searchParams} />
    </Suspense>
  );
}

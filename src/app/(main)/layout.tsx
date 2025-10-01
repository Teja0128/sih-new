'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppHeader from '@/components/layout/app-header';
import {
  DoctorSidebarNav,
  PatientSidebarNav,
} from '@/components/layout/sidebar-nav';
import { Logo } from '@/components/icons/logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import Chatbot from '@/components/chatbot/chatbot';
import BottomNav from '@/components/layout/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href={`/?role=${role}`} className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-semibold tracking-tight">AyuLink</span>
          </Link>
        </SidebarHeader>
        <Separator />
        <Suspense fallback={<div>Loading navigation...</div>}>
          <SidebarContent>
            {role === 'doctor' ? <DoctorSidebarNav /> : <PatientSidebarNav />}
          </SidebarContent>
        </Suspense>
        <Separator />
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <LogOut />
              <span>Log Out</span>
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col bg-muted/40">
        <Suspense fallback={<div>Loading header...</div>}>
          <AppHeader />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <Chatbot />
        <Suspense fallback={<div>Loading bottom navigation...</div>}>
          <BottomNav />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}

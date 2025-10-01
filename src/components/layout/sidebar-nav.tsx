
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, FileText, Search, Settings, Home, FileUp } from "lucide-react";

const doctorMenuItems = [
   {
    href: "/",
    icon: Home,
    label: "Homepage",
  },
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/patients",
    icon: Users,
    label: "Patients",
  },
  {
    href: "/reporting",
    icon: FileText,
    label: "Reporting",
  },
  {
    href: "/search",
    icon: Search,
    label: "Diagnosis Search",
  },
   {
    href: "/upload",
    icon: FileUp,
    label: "Upload Report",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  }
];

const patientMenuItems = [
   {
    href: "/",
    icon: Home,
    label: "Homepage",
  },
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "My Dashboard",
  },
   {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  }
];

export function DoctorSidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';


  return (
    <SidebarMenu>
      {doctorMenuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href && item.href !== '/'}
            tooltip={item.label}
          >
            <Link href={`${item.href}?role=${role}`}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function PatientSidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'patient';

  return (
    <SidebarMenu>
      {patientMenuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href && item.href !== '/'}
            tooltip={item.label}
          >
            <Link href={`${item.href}?role=${role}`}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

// Default export can be one of them or a combined component if needed
export const SidebarNav = DoctorSidebarNav;

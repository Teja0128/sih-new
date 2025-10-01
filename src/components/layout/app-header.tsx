
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Settings, ArrowLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mainContent = document.querySelector("main");
    const handleScroll = () => {
        if (mainContent) {
            setScrolled(mainContent.scrollTop > 5);
        }
    };
    if (mainContent) {
        mainContent.addEventListener("scroll", handleScroll);
    }
    return () => {
        if (mainContent) {
            mainContent.removeEventListener("scroll", handleScroll);
        }
    }
  }, []);
  
  const getPageTitle = () => {
    if (pathname.startsWith("/patients")) {
      return "Patient Records";
    }
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/search":
        return "Diagnosis Search";
      case "/reporting":
        return "Reporting";
      case "/upload":
        return "Upload Report";
       case "/settings":
        return "Settings";
      default:
        return "AyuLink";
    }
  };

  const handleLogout = () => {
    router.push('/'); 
  }
  
  const userName = role === 'doctor' ? 'Dr. Anya Sharma' : 'John Doe';
  const userEmail = role === 'doctor' ? 'doctor.anya@ayulink.com' : 'patient.john@ayulink.com';
  const avatarSeed = role === 'doctor' ? 'doc-avatar' : 'patient-avatar';

  const showBackButton = pathname !== '/dashboard';

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6 transition-shadow",
      scrolled && "shadow-md"
    )}>
      <div className="flex items-center gap-4">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        {showBackButton && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}
        <div className="hidden md:block">
            <h1 className="text-xl font-semibold tracking-tight">
            {getPageTitle()}
            </h1>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={`https://picsum.photos/seed/${avatarSeed}/100/100`}
                  alt="User Avatar"
                />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/settings?role=${role}`}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

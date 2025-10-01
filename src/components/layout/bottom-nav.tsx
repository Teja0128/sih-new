
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Home, Search, Upload, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatbotStore } from '@/hooks/use-chatbot-store';
import { Button } from '../ui/button';


export default function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';
  const { openChatbot } = useChatbotStore();

  const navItems =
    role === 'doctor'
      ? [
          { href: '/dashboard', icon: Home, label: 'Home' },
          { href: '/search', icon: Search, label: 'Search' },
          { href: '/upload', icon: Upload, label: 'Upload' },
        ]
      : [{ href: '/dashboard', icon: Home, label: 'Home' }];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className={cn("grid h-full max-w-lg mx-auto font-medium", role === 'doctor' ? 'grid-cols-4' : 'grid-cols-2' )}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={`${item.href}?role=${role}`}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted-foreground/10 group',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1',
                )}
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
        <Button
            variant="ghost"
            onClick={openChatbot}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted-foreground/10 group text-muted-foreground h-full"
        >
            <Bot className="w-6 h-6 mb-1" />
            <span className="text-xs">Chat</span>
        </Button>
      </div>
    </div>
  );
}

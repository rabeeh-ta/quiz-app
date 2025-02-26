'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, User } from 'lucide-react';

export default function BottomNavigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-background shadow-sm">
            <Link
                href="/"
                className={`flex flex-1 flex-col items-center justify-center ${pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Home size={24} className={pathname === '/' ? 'text-primary' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Home</span>
            </Link>

            <Link
                href="/explore"
                className={`flex flex-1 flex-col items-center justify-center ${pathname === '/explore' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <Compass size={24} className={pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Explore</span>
            </Link>

            <Link
                href="/account"
                className={`flex flex-1 flex-col items-center justify-center ${pathname === '/account' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
                <User size={24} className={pathname === '/account' ? 'text-primary' : 'text-muted-foreground'} />
                <span className="text-xs mt-1">Account</span>
            </Link>
        </div>
    );
} 
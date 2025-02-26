'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold">Quiz App</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center space-x-4 md:justify-end">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center p-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/explore"
                        className={cn(
                            "flex items-center p-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/explore" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <Compass className="mr-2 h-4 w-4" />
                        <span>Explore</span>
                    </Link>
                    <Link
                        href="/account"
                        className={cn(
                            "flex items-center p-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/account" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Account</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
} 
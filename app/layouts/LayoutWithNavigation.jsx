'use client';

import { usePathname } from 'next/navigation';
import BottomNavigation from '../components/BottomNavigation';

/**
 * Layout component that conditionally renders navigation
 * based on the current path
 */
export default function LayoutWithNavigation({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <>
            <main className="mt-4 mx-4" style={{ paddingBottom: isLoginPage ? '0' : '70px' }}>
                {children}
            </main>
            {!isLoginPage && <BottomNavigation />}
        </>
    );
} 
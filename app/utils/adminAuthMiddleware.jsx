// app/utils/SuperAdminAuthMiddleware.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';

/**
 * Super Admin authentication middleware that checks if user has super_admin claim
 * and redirects to no-access page if not
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Children components to render if authenticated as super admin
 * @returns {React.ReactNode} - Either the children or null (during redirect)
 */
export default function AdminAuthMiddleware({ children }) {
    const { user, loading, roles } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Check both authentication and super admin status after loading
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!roles.includes('admin')) {
                router.push('/');
            }
        }
    }, [user, loading, roles, router]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If not super admin or not logged in, don't render anything (will be redirected by useEffect)
    if (!user || !roles.includes('admin')) {
        return null;
    }

    // User is authenticated and is a super admin, render the children
    return children;
}
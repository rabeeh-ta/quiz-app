'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';

/**
 * Authentication middleware component that checks if user is logged in
 * and redirects to login page if not
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Children components to render if authenticated
 * @returns {React.ReactNode} - Either the children or null (during redirect)
 */
export default function AuthMiddleware({ children }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Only redirect after loading is complete and we know there's no user
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If not logged in, don't render anything (will be redirected by useEffect)
    if (!user) {
        return null;
    }

    // User is authenticated, render the children
    return children;
} 
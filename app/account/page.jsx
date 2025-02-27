'use client';

import { useState, useEffect } from 'react';
import BottomNavigation from '@/app/components/BottomNavigation';
import { auth, signInWithGoogle, signOutUser } from '@/app/firebase';
import SignInGoogleCard from '@/app/account/SignInGoogleCard';
import UserProfileCard from '@/app/account/UserProfileCard';
import SignOutCard from '@/app/account/SignOutCard';
import ThemeToggle from '@/app/components/theme-toggle';

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Google sign in failed:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <div className="container space-y-4">
                <h1 className="text-3xl font-bold ms-2 mb-6">Account</h1>



                {!user && <SignInGoogleCard handleGoogleSignIn={handleGoogleSignIn} />}

                {user && <UserProfileCard user={user} />}
                {/* Theme Toggle Card */}
                <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold mb-3">Appearance</h2>
                    <ThemeToggle />
                </div>
                {user && <SignOutCard handleSignOut={handleSignOut} />}
            </div>
            <BottomNavigation />
        </>
    );
} 
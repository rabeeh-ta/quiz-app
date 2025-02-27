'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '@/app/firebase';

// Create the user context
const UserContext = createContext(null);

/**
 * UserProvider component to wrap around your app
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);

        // Set up listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // User is signed in
                // Create a clean user object with just the data we need
                setUser({
                    id: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                });
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

/**
 * Hook to use the user context
 * @returns {Object} User context value
 */
export function useUser() {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 
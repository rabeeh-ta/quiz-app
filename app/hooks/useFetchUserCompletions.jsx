'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '@/app/firebase';

/**
 * Custom hook to fetch user completion records from Firestore
 * @param {string} userId - The ID of the user to fetch completions for
 * @param {boolean} answered - Whether to fetch correct or incorrect answers
 * @returns {Object} - Object containing data, loading state, and error
 */
export default function useFetchUserCompletions(userId, answered) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletions = async () => {
            if (!userId || answered === undefined) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const db = getFirestore(app);
                const completionsCollection = collection(db, 'userCompletions');

                // Create a query with multiple conditions
                const q = query(
                    completionsCollection,
                    where('userId', '==', userId),
                    where('answered', '==', answered)
                );

                const querySnapshot = await getDocs(q);

                const completionsData = [];
                querySnapshot.forEach((doc) => {
                    completionsData.push({
                        id: doc.id,
                        ...doc.data(),
                        // Convert Firestore timestamp to JS Date
                        attempted_on: doc.data().attempted_on?.toDate() || null
                    });
                });

                setData(completionsData);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching user completions:', err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchCompletions();
    }, [userId, answered]);

    return { data, isLoading, error };
}

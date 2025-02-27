'use client';

import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '@/app/firebase';

/**
 * Custom hook to add a user completion record to Firestore
 * @returns {Object} - Object containing addCompletion function, loading state, and error
 */
export default function useAddUserCompletion() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Add a user completion record to Firestore
     * @param {string} userId - The ID of the user
     * @param {string} questionId - The ID of the question
     * @param {string} subject - The subject of the question
     * @param {boolean} answered - Whether the user answered correctly
     * @returns {Promise<boolean>} - True if successful, false otherwise
     */
    const addCompletion = async (userId, questionId, subject, answered) => {
        if (!userId || !questionId || !subject === undefined || answered === undefined) {
            setError(new Error('Missing required parameters'));
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            const db = getFirestore(app);
            const completionsCollection = collection(db, 'userCompletions');

            await addDoc(completionsCollection, {
                attempted_on: new Date(),
                userId,
                questionId,
                subject,
                answered
            });

            setIsLoading(false);
            return true; // Return success
        } catch (err) {
            console.error('Error adding user completion:', err);
            setError(err);
            setIsLoading(false);
            return false; // Return failure
        }
    };

    return { addCompletion, isLoading, error };
}

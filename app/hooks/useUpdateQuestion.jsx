'use client';

import { useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '@/app/firebase';

/**
 * Custom hook to update a question document with additional fields
 * @param {string} collectionName - The name of the collection
 * @param {string} documentId - The ID of the document to update
 * @param {Object} newFields - Object containing description and answer
 * @returns {Object} - Object containing update function, loading state, and error
 */
export default function useUpdateQuestion() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateQuestion = async (collectionName, documentId, newFields) => {
        if (!collectionName || !documentId || !newFields) {
            setError(new Error('Missing required parameters'));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const db = getFirestore(app);
            const questionRef = doc(db, collectionName, documentId);

            await updateDoc(questionRef, {
                description: newFields.description,
                answer: newFields.answer,
                updatedAt: new Date()  // Optional: add a timestamp for when the update occurred
            });

            setIsLoading(false);
            return true; // Return success
        } catch (err) {
            console.error('Error updating question:', err);
            setError(err);
            setIsLoading(false);
            return false; // Return failure
        }
    };

    return { updateQuestion, isLoading, error };
}

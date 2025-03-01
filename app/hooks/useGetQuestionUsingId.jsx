'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '@/app/firebase';

/**
 * Custom hook to fetch a single question from Firestore by ID
 * @param {string} collectionName - The name of the collection
 * @param {string} id - The document ID to fetch
 * @returns {Object} - Object containing data, loading state, and error
 */
export default function useGetQuestionUsingId(collectionName, id) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!collectionName || !id) {
                setIsLoading(false);
                return;
            }

            try {
                const db = getFirestore(app);
                const docRef = doc(db, collectionName, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log(`No such document! with id: ${id}`);
                    setData(null);
                }
                setIsLoading(false);
            } catch (err) {
                console.error(`Error fetching document with ID ${id}:`, err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [collectionName, id]);

    return { data, isLoading, error };
}

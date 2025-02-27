'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '@/app/firebase';

/**
 * Custom hook to fetch questions from Firestore
 * @param {string} documentName - The name of the document/collection to fetch
 * @returns {Object} - Object containing data, loading state, and error
 */
export default function useGetQuestion(documentName) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!documentName) {
                setIsLoading(false);
                return;
            }

            try {
                const db = getFirestore(app);
                const questionsCollection = collection(db, documentName);
                const querySnapshot = await getDocs(questionsCollection);

                const questionsData = {};
                querySnapshot.forEach((doc) => {
                    questionsData[doc.id] = doc.data();
                });

                setData(questionsData);
                setIsLoading(false);
            } catch (err) {
                console.error(`Error fetching ${documentName} data:`, err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [documentName]);

    return { data, isLoading, error };
}

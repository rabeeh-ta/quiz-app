import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/app/firebase';
import { useUser } from '@/app/context/UserContext';

export default function useSubjectAnalytics(subject) {
    const [analytics, setAnalytics] = useState({
        totalQuestions: 0,
        answeredQuestions: 0,
        wrongAttempts: 0,
        totalAttempts: 0,
        loading: true,
        error: null
    });
    const { user } = useUser();
    const db = getFirestore(app);

    useEffect(() => {
        if (!user || !subject) {
            setAnalytics(prev => ({ ...prev, loading: false }));
            return;
        }

        async function fetchAnalytics() {
            try {
                // Get total questions in the subject
                const subjectRef = collection(db, subject);
                const totalQuestionsSnapshot = await getDocs(subjectRef);
                const totalQuestions = totalQuestionsSnapshot.size;

                // Get user's attempts for this subject
                const completionsRef = collection(db, 'userCompletions');
                const userAttemptsQuery = query(
                    completionsRef,
                    where('userId', '==', user.id),
                    where('subject', '==', subject)
                );
                const userAttemptsSnapshot = await getDocs(userAttemptsQuery);

                // Track unique answered questions and wrong attempts
                const uniqueAnsweredQuestions = new Set();
                let wrongAttempts = 0;
                let totalAttempts = 0;

                userAttemptsSnapshot.forEach(doc => {
                    const attempt = doc.data();
                    totalAttempts++;
                    uniqueAnsweredQuestions.add(attempt.questionId);
                    if (!attempt.answered) {
                        wrongAttempts++;
                    }
                });

                setAnalytics({
                    totalQuestions,
                    answeredQuestions: uniqueAnsweredQuestions.size,
                    wrongAttempts,
                    totalAttempts,
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching subject analytics:', error);
                setAnalytics(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        }

        fetchAnalytics();
    }, [user, subject, db]);

    return analytics;
} 
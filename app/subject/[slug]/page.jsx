'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '@/app/firebase';
import QuestionText from './QuestionText';

export default function SubjectPage() {
    // In App Router, use useParams instead of useRouter().query
    const params = useParams();
    const slug = params.slug;
    const [questions, setQuestions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore(app);
                const questionsCollection = collection(db, slug);
                const querySnapshot = await getDocs(questionsCollection);

                const questionsData = {};
                querySnapshot.forEach((doc) => {
                    questionsData[doc.id] = doc.data();
                });

                setQuestions(questionsData);
                console.log(questionsData);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${slug} data:`, error);
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Subject: {slug}</h1>
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Subject: {slug}</h1>

            {Object.keys(questions).length > 0 ? (
                <div className="space-y-4">
                    {Object.entries(questions).map(([id, data]) =>
                        (<QuestionText key={id} id={id} question={data.question} />)
                    )}
                </div>
            ) : (
                <p>No questions found for this subject.</p>
            )}
        </div>
    );
} 
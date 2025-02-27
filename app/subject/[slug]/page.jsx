'use client';
import { useParams } from 'next/navigation';
import QuestionText from './QuestionText';
import useGetQuestion from '@/app/hooks/useFetchQuestion';
import Spinner from '@/app/components/spinner';

export default function SubjectPage() {
    // In App Router, use useParams instead of useRouter().query
    const params = useParams();
    const slug = params.slug;

    // Use the custom hook to fetch questions
    const { data: questions, isLoading, error } = useGetQuestion(slug);

    if (isLoading) {
        return (
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Subject: {slug}</h1>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Subject: {slug}</h1>
                <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
                    <p>Error loading questions: {error.message}</p>
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
'use client';
import { useParams } from 'next/navigation';
import useGetQuestion from '@/app/hooks/useFetchQuestion';
import Spinner from '@/app/components/spinner';
import AuthMiddleware from '@/app/utils/authMiddleware';
import QuestionCard from '@/app/components/question-card';

export default function SubjectPage() {
    // In App Router, use useParams instead of useRouter().query
    const params = useParams();
    const slug = params.slug;

    // Use the custom hook to fetch questions
    const { data: questions, isLoading, error } = useGetQuestion(slug);


    // Content to be rendered conditionally
    const content = () => {
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
                    <div className="space-y-8">
                        {Object.entries(questions).map(([id, data]) =>
                            (<QuestionCard question={data.question} questionId={id} answer={data.answer} description={data.explanation} />)
                        )}
                    </div>
                ) : (
                    <p>No questions found for this subject.</p>
                )}
            </div>
        );
    };

    return (
        <AuthMiddleware>
            {content()}
        </AuthMiddleware>
    );
} 
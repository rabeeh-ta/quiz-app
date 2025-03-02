import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';


const QuizCompletionCard = ({ totalQuestions = 10, correctAnswers = 7 }) => {
    const router = useRouter();
    // Calculate statistics
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Determine performance level
    const getPerformanceLevel = () => {
        if (percentage >= 90) return { text: 'Excellent!', color: 'bg-green-500' };
        if (percentage >= 70) return { text: 'Good job!', color: 'bg-blue-500' };
        if (percentage >= 50) return { text: 'Not bad!', color: 'bg-yellow-500' };
        return { text: 'Keep practicing!', color: 'bg-red-500' };
    };

    const performance = getPerformanceLevel();

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-primary/10">
            <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                    <div className="rounded-full p-3 bg-primary/10">
                        <Trophy className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
                <CardDescription>Here's how you did</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex justify-center">
                    <Badge className={`text-white py-1 px-4 text-lg ${performance.color}`}>
                        {performance.text}
                    </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
                    </div>

                    <div className="p-4 bg-green-100 rounded-lg">
                        <p className="text-sm text-green-600">Correct</p>
                        <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                    </div>

                    <div className="p-4 bg-red-100 rounded-lg">
                        <p className="text-sm text-red-600">Wrong</p>
                        <p className="text-2xl font-bold text-red-600">{wrongAnswers}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Your score</span>
                        <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-300 h-2.5 rounded-full" // Changed to blue for better visibility in dark mode
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-2">
                <Button onClick={() => router.push(`/`)} >
                    Back to Dashboard
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QuizCompletionCard;
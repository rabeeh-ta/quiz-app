'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import MCQComponent from '@/app/components/mcq-component';
import { useParams } from 'next/navigation';
import useGetQuestion from '@/app/hooks/useFetchQuestion';
import Spinner from '@/app/components/spinner';
import useFetchLlm from '@/app/hooks/useFetchLlm';
import useUpdateQuestion from '@/app/hooks/useUpdateQuestion';
import { useUser } from '@/app/context/UserContext';
import AuthMiddleware from '@/app/utils/authMiddleware';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QuizCompletionCard from '@/app/components/quiz-completion-card';

function popFromStack(stack, setStack) {
    const poppedValue = stack.pop();
    setStack(stack);
    return poppedValue;
}

function QuizPage() {
    const { slug } = useParams();
    const { user } = useUser();
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentQuestionScreen, setCurrentQuestionScreen] = useState(null);
    const [currentQuestionScreenLoading, setCurrentQuestionScreenLoading] = useState(true);
    const [quizOver, setQuizOver] = useState(false);
    const [questionsStack, setQuestionsStack] = useState([]);
    const [totalQuestionsAttempted, setTotalQuestionsAttempted] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    //data fetching
    const { data: allQuestionData, isLoading: allQuestionDataLoading, error: allQuestionDataError } = useGetQuestion(slug);
    const { generateMCQ } = useFetchLlm();
    const { updateQuestion, isLoading: updateQuestionLoading, error: updateQuestionError } = useUpdateQuestion();

    // Function to end the quiz
    const endQuiz = useCallback(() => {
        setCurrentQuestion(null);
        setCurrentQuestionScreen(null);
        setQuizOver(true);
    }, []);

    // Function to track question results
    const handleQuestionResult = useCallback((isCorrect) => {
        setTotalQuestionsAttempted(prev => prev + 1);
        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
        }
    }, []);

    // data fetch and setting.
    useEffect(() => {
        if (allQuestionData) {
            const questionsArray = Object.values(allQuestionData);
            const shuffledQuestions = questionsArray.sort(() => Math.random() - 0.5);
            const firstPopped = shuffledQuestions.pop();
            setQuestionsStack(shuffledQuestions);
            setCurrentQuestion(firstPopped);
        }
    }, [allQuestionData]);

    function handleNextQuestion() {
        if (questionsStack.length === 0) {
            setQuizOver(true);
            return;
        }
        setCurrentQuestionScreenLoading(true);
        const questionPopped = popFromStack(questionsStack, setQuestionsStack);
        setCurrentQuestion(questionPopped);
    }

    useEffect(() => {

        if (currentQuestion) {
            if (currentQuestion?.options?.length === 4) {
                setCurrentQuestionScreen({ ...currentQuestion, options: currentQuestion.options.sort(() => Math.random() - 0.5) });
                setCurrentQuestionScreenLoading(false);
            } else {
                // generate mcq
                generateMCQ(currentQuestion.question).then(mcq => {
                    setCurrentQuestionScreen({ answer: mcq.options[mcq.answer_key], options: mcq.options, explanation: mcq.explanation, question: currentQuestion.question, id: currentQuestion.id });
                    updateQuestion(slug, currentQuestion.id, { options: mcq.options, answer: mcq.options[mcq.answer_key], explanation: mcq.explanation });
                    setCurrentQuestionScreenLoading(false);
                }).catch(error => {
                    alert("Error generating MCQ");
                    router.push(`/`);
                    setCurrentQuestionScreenLoading(true);
                });
            }
        }
    }, [currentQuestion, quizOver]);

    if (allQuestionDataLoading) {
        return <Spinner />;
    }

    if (allQuestionDataError) {
        return <div>Error: {allQuestionDataError.message}</div>;
    }

    return (
        <AuthMiddleware>
            <div className="flex flex-col items-center justify-center h-screen-90">
                {/* End Quiz Button */}
                {!quizOver && !currentQuestionScreenLoading && (
                    <div className="w-full flex justify-end px-4 mb-4">
                        <Button
                            variant="destructive"
                            onClick={endQuiz}
                            className="mb-4"
                        >
                            End Quiz
                        </Button>
                    </div>
                )}

                {/* Loading Spinner */}
                {currentQuestionScreenLoading && <Spinner />}

                {/* MCQ Component */}
                {!currentQuestionScreenLoading && !quizOver
                    && <MCQComponent
                        options={currentQuestionScreen.options.map((option, index) => ({ id: index, text: option }))}
                        correctAnswer={currentQuestionScreen.answer}
                        handleNext={handleNextQuestion}
                        isLoading={currentQuestionScreenLoading}
                        question={currentQuestionScreen.question}
                        explanation={currentQuestionScreen.explanation}
                        questionId={currentQuestionScreen.id}
                        subject={slug}
                        onQuestionResult={handleQuestionResult}
                    />}

                {/* Quiz Completion Card */}
                {quizOver &&
                    <QuizCompletionCard
                        totalQuestions={totalQuestionsAttempted}
                        correctAnswers={correctAnswers}
                    />
                }
            </div>
        </AuthMiddleware>
    )
}

export default QuizPage
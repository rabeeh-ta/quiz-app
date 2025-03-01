'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import MCQComponent from '@/app/components/mcq-component';
import { useParams } from 'next/navigation';
import useGetQuestion from '@/app/hooks/useFetchQuestion';
import Spinner from '@/app/components/spinner';
import useFetchLlm from '@/app/hooks/useFetchLlm';
import useUpdateQuestion from '@/app/hooks/useUpdateQuestion';
import { useUser } from '@/app/context/UserContext';
import useFetchUserCompletions from '@/app/hooks/useFetchUserCompletions';
import AuthMiddleware from '@/app/utils/authMiddleware';

function QuizPage() {
    const { slug } = useParams();
    const { user } = useUser();
    const { data: questions, isLoading: questionsLoading, error: questionsError } = useGetQuestion(slug);
    const [question, setQuestion] = useState({
        question: "",
        options: [],
        correctAnswer: "",
        explanation: "",
    });

    //data fetching
    const { data: mcq, isLoading: mcqLoading, error: mcqError, generateMCQ } = useFetchLlm();
    const { updateQuestion, isLoading: updateQuestionLoading, error: updateQuestionError } = useUpdateQuestion();
    const { data: userCompletions, isLoading: userCompletionsLoading, error: userCompletionsError } = useFetchUserCompletions(user?.id, true);

    const [currentQuestionNo, setCurrentQuestion] = useState(null);

    //? get the already answered questions
    const alreadyAnsweredQuestions = useMemo(() => {
        if (userCompletions) {
            return userCompletions.filter(completion => completion.answered === true).map(completion => completion.questionId);
        }
        return [];
    }, [userCompletions, user]);

    //? utility function to find the next unanswered question
    const findNextUnansweredQuestion = useCallback((currentNo, totalQs) => {
        // Base case: if we've reached the end of questions
        if (currentNo >= totalQs - 1) {
            return totalQs - 1; // Return the last question index
        }

        // Check if the next question has already been answered
        const nextQuestionId = parseInt(Object.keys(questions)[currentNo + 1], 10);
        if (alreadyAnsweredQuestions.includes(nextQuestionId)) {
            // If already answered, recursively check the next one
            return findNextUnansweredQuestion(currentNo + 1, totalQs);
        } else {
            // Found an unanswered question
            return currentNo + 1;
        }
    }, [questions, alreadyAnsweredQuestions]);

    // get the total number of questions
    const totalQuestions = useMemo(() => {
        if (questions && Object.keys(questions).length > 0) {
            if (currentQuestionNo === null) {  // Only set if not already set
                // Find first unanswered question starting from index -1
                // or use 0 if you want to start from the first question
                const firstUnansweredIndex = findNextUnansweredQuestion(-1, Object.keys(questions).length);
                setCurrentQuestion(firstUnansweredIndex);
            }
            return Object.keys(questions).length;
        }
        return 0;
    }, [questions, currentQuestionNo, questionsLoading, findNextUnansweredQuestion]);

    // handle the next question
    const handleNextQuestion = () => {
        if (currentQuestionNo < totalQuestions - 1) {
            const nextQuestionNo = findNextUnansweredQuestion(currentQuestionNo, totalQuestions);
            setCurrentQuestion(nextQuestionNo);
        }
    }

    // call the LLM to generate the MCQ
    useEffect(() => {
        if (currentQuestionNo < totalQuestions - 1 && !questionsLoading && currentQuestionNo >= 0) {
            generateMCQ(Object.values(questions)[currentQuestionNo].question);
        }
    }, [currentQuestionNo, totalQuestions, questionsLoading]);

    // update the current question object with the data from the LLM
    useEffect(() => {
        if (mcq) {
            setQuestion({
                questionId: Object.keys(questions)[currentQuestionNo],
                question: Object.values(questions)[currentQuestionNo].question,
                options: mcq.options.map(option => ({
                    id: option,
                    text: option,
                })),
                subject: slug,
                correctAnswer: mcq.options[mcq.answer_key],
                explanation: mcq.explanation,
            });
        }
    }, [mcq]);

    // console.log("question", question);

    useEffect(() => {
        if (question && currentQuestionNo !== null) {
            updateQuestion(slug, question.key, {
                description: question.explanation,
                answer: question.correctAnswer,
            });
        }
    }, [question]);

    useEffect(() => {
        console.log("currentQuestionNo", currentQuestionNo);
    }, [currentQuestionNo]);


    if (questionsLoading) {
        return <Spinner />;
    }

    if (questionsError) {
        return <div>Error: {questionsError.message}</div>;
    }

    return (
        <AuthMiddleware>
            <div className="flex items-center justify-center h-screen-90">
                {mcqLoading ? <Spinner /> : <MCQComponent questionKey={currentQuestionNo} {...question} handleNext={handleNextQuestion} />}
            </div>
        </AuthMiddleware>
    )
}

export default QuizPage
'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import MCQComponent from '@/app/components/mcq-component';
import { useParams } from 'next/navigation';
import useGetQuestion from '@/app/hooks/useFetchQuestion';
import Spinner from '@/app/components/spinner';
import useFetchLlm from '@/app/hooks/useFetchLlm';
import useUpdateQuestion from '@/app/hooks/useUpdateQuestion';

function QuizPage() {
    const { slug } = useParams();
    const { data: questions, isLoading: questionsLoading, error: questionsError } = useGetQuestion(slug);
    const [question, setQuestion] = useState({
        question: "",
        options: [],
        correctAnswer: "",
        explanation: "",
    });
    const { data: mcq, isLoading: mcqLoading, error: mcqError, generateMCQ } = useFetchLlm();
    const { updateQuestion, isLoading: updateQuestionLoading, error: updateQuestionError } = useUpdateQuestion();

    const [currentQuestionNo, setCurrentQuestion] = useState(null);

    const totalQuestions = useMemo(() => {
        if (questions && Object.keys(questions).length > 0) {
            if (currentQuestionNo === null) {  // Only set if not already set
                setCurrentQuestion(0);
            }
            return Object.keys(questions).length;
        }
        return 0;
    }, [questions, currentQuestionNo, questionsLoading]);

    const handleNextQuestion = () => {
        if (currentQuestionNo < totalQuestions - 1) {
            setCurrentQuestion(currentQuestionNo + 1);
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
                question: Object.values(questions)[currentQuestionNo].question,
                options: mcq.options.map(option => ({
                    id: option,
                    text: option,
                })),
                correctAnswer: mcq.options[mcq.answer_key],
                explanation: mcq.explanation,
                key: Object.keys(questions)[currentQuestionNo],
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


    if (questionsLoading) {
        return <Spinner />;
    }

    if (questionsError) {
        return <div>Error: {questionsError.message}</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen-90">
            {mcqLoading ? <Spinner /> : <MCQComponent {...question} handleNext={handleNextQuestion} />}
        </div>
    )
}

export default QuizPage
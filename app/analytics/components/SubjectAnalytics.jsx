import React from 'react';
import useSubjectAnalytics from '@/app/hooks/useSubjectAnalytics';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Spinner from '@/app/components/spinner';

export default function SubjectAnalytics({ subject }) {
    const { totalQuestions, answeredQuestions, wrongAttempts, totalAttempts, loading, error } = useSubjectAnalytics(subject);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Card className="border-destructive">
                <CardContent className="pt-6">
                    <h3 className="text-destructive font-semibold">Error loading analytics</h3>
                    <p className="text-destructive/80 text-sm">{error}</p>
                </CardContent>
            </Card>
        );
    }

    const correctAttempts = totalAttempts - wrongAttempts;
    const completionRate = totalQuestions > 0 ? ((answeredQuestions / totalQuestions) * 100).toFixed(1) : 0;
    const accuracyRate = totalAttempts > 0 ? ((correctAttempts / totalAttempts) * 100).toFixed(1) : 0;

    return (
        <Card id={subject}>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl capitalize">{subject}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Total Questions Available</p>
                        <p className="text-2xl font-bold">{totalQuestions}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Total number of attempts</p>
                        <p className="text-2xl font-bold">{totalAttempts}</p>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Correctly Answered</p>
                        <p className="text-2xl font-bold text-green-600">{correctAttempts}</p>
                        <p className="text-xs text-muted-foreground">{completionRate}% completed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Wrongly Answered</p>
                        <p className="text-2xl font-bold text-red-600">{wrongAttempts}</p>
                        <p className="text-xs text-muted-foreground">{accuracyRate}% accuracy</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 
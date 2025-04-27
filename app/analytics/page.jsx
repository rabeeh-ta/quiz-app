'use client'
import { useEffect, useState } from 'react'
import DailyAttempts from './components/DailyAttempts'
import Streak from './components/UserStreakComponet'
import SubjectAnalytics from './components/SubjectAnalytics'
import subjects from '../data/subjects'
import AuthMiddleware from '../utils/authMiddleware'

function AnalyticsPage() {
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.slice(1);
            const element = document.getElementById(id);

            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Wait for the initial scroll to complete before adding offset
                setTimeout(() => {
                    window.scrollBy({ top: -500, behavior: 'smooth' });
                }, 100);
            } else if (retryCount < 5) {
                // Retry after a delay if element not found
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 500);
            }
        }
    }, [retryCount]); // Will re-run when retryCount changes

    return (
        <AuthMiddleware>
            <div className='flex flex-col items-center gap-4'>
                <Streak />
                <DailyAttempts />
                {subjects.map((subject) => (
                    <SubjectAnalytics key={subject.slug} subject={subject.slug} />
                ))}
            </div>
        </AuthMiddleware>
    )
}

export default AnalyticsPage
'use client'
import DailyAttempts from './components/DailyAttempts'
import Streak from './components/UserStreakComponet'
import SubjectAnalytics from './components/SubjectAnalytics'
import subjects from '../data/subjects'
import AuthMiddleware from '../utils/authMiddleware'
function AnalyticsPage() {
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
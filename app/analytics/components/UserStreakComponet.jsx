import Spinner from '@/app/components/spinner';
import useUserWeeklyStreak from '@/app/hooks/useUserWeeklyStreak';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Streak() {
    const { streak, weekDays, loading } = useUserWeeklyStreak();
    if (loading) return <Spinner />;

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-card rounded-lg shadow flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Weekly Streak</h3>
            <div className="flex gap-2 mb-2">
                {weekDays.map((done, i) => (
                    <div key={i} className={`flex flex-col items-center`}>
                        <span
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                                ${done ? 'bg-green-400 border-green-600 text-white' : 'bg-gray-200 border-gray-400 text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500'}`}
                        >
                            {dayNames[i][0]}
                        </span>
                        <span className="text-xs mt-1 text-muted-foreground">{dayNames[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 
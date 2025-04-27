import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/app/firebase';
import { useUser } from '@/app/context/UserContext';

// Returns the user's current weekly streak (Sun-Sat)
export default function useUserWeeklyStreak() {
    const [streak, setStreak] = useState(0);
    const [weekDays, setWeekDays] = useState([false, false, false, false, false, false, false]); // Sun-Sat
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const db = getFirestore(app);

    useEffect(() => {
        if (!user) {
            console.log('No user available, skipping streak fetch');
            return;
        }

        async function fetchWeeklyStreak() {
            console.log('Starting to fetch weekly streak for user:', user.id);
            try {
                // Get the start and end of the current week (Sunday to Saturday)
                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
                startOfWeek.setHours(0, 0, 0, 0);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);

                console.log('Querying for date range:', {
                    start: startOfWeek.toISOString(),
                    end: endOfWeek.toISOString()
                });

                // Query userCompletions for this user and this week
                const q = query(
                    collection(db, 'userCompletions'),
                    where('userId', '==', user.id),
                    where('attempted_on', '>=', startOfWeek),
                    where('attempted_on', '<=', endOfWeek)
                );
                const snapshot = await getDocs(q);
                console.log('Documents found:', snapshot.size);

                // Track which days have completions
                const daysWithCompletion = [false, false, false, false, false, false, false];
                snapshot.forEach(doc => {
                    const docData = doc.data();
                    console.log('Processing document:', doc.id, docData);
                    const { attempted_on } = docData;
                    if (attempted_on) {
                        const date = attempted_on.toDate();
                        const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
                        daysWithCompletion[dayOfWeek] = true;
                    }
                });

                console.log('Days with completion:', daysWithCompletion);
                setWeekDays(daysWithCompletion);

                let streakCount = 0;
                for (let i = 0; i <= now.getDay(); i++) {
                    if (daysWithCompletion[i]) {
                        streakCount++;
                    } else {
                        streakCount = 0;
                    }
                }
                console.log('Final streak count:', streakCount);
                setStreak(streakCount);
            } catch (error) {
                console.error('Error fetching weekly streak:', error);
            }
        }

        fetchWeeklyStreak();
    }, [user, db]);

    const result = { streak, weekDays, loading };
    return result;
} 
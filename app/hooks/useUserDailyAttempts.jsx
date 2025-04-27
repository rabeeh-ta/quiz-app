'use client'

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/app/firebase';
import { useUser } from '@/app/context/UserContext';


// returns an object with the date as the key and an array of timestamps as the value of the attempts done by the user on that day
export default function useUserDailyAttempts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const db = getFirestore(app);

    useEffect(() => {
        if (!user) return;

        async function fetchAttempts() {
            setLoading(true);
            const q = query(
                collection(db, 'userCompletions'),
                where('userId', '==', user.id)
            );
            const snapshot = await getDocs(q);
            const attemptsByDate = {};

            snapshot.forEach(doc => {
                const docData = doc.data();
                const { attempted_on, answered } = docData;
                if (attempted_on) {
                    const date = attempted_on.toDate();
                    const day = date.toISOString().split('T')[0];
                    if (!attemptsByDate[day]) {
                        attemptsByDate[day] = {
                            date: day,
                            totalCorrectAnswers: 0,
                            totalWrongAnswers: 0,
                            correctAnswersTimeStamp: [],
                            wrongAnswersTimeStamp: []
                        };
                    }
                    if (answered) {
                        attemptsByDate[day].totalCorrectAnswers += 1;
                        attemptsByDate[day].correctAnswersTimeStamp.push(date.getTime());
                    } else {
                        attemptsByDate[day].totalWrongAnswers += 1;
                        attemptsByDate[day].wrongAnswersTimeStamp.push(date.getTime());
                    }
                }
            });
            setData(Object.values(attemptsByDate));
            setLoading(false);
        }

        fetchAttempts();
    }, [user]);

    return { data, loading };
}
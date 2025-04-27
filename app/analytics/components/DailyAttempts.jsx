'use client'
import React from 'react'
import Spinner from '@/app/components/spinner'
import useUserDailyAttempts from '@/app/hooks/useUserDailyAttempts'
import dynamic from 'next/dynamic'
import { useState } from 'react'

function DailyAttempts() {
    const [weekOffset, setWeekOffset] = useState(0);
    const windowSize = 7;

    const { data: userDailyAttempts, loading: userDailyAttemptsLoading } = useUserDailyAttempts()

    if (userDailyAttemptsLoading) {
        return <Spinner />
    }

    // Helper to get YYYY-MM-DD for a Date
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Helper to format for chart label
    function formatDateLabel(dateStr) {
        const date = new Date(dateStr);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day} ${month}`;
    }

    // Sort data by date ascending
    const sortedData = [...userDailyAttempts].sort((a, b) => new Date(a.date) - new Date(b.date))
    // Build a map for quick lookup
    const dataMap = Object.fromEntries(sortedData.map(item => [item.date, item]))

    // Find the latest date with data or today, whichever is later
    const today = new Date();
    const todayStr = formatDate(today);
    const lastDataDate = sortedData.length > 0 ? sortedData[sortedData.length - 1].date : todayStr;
    // Use today if it's after the last data date, otherwise use last data date
    const endDate = todayStr > lastDataDate ? todayStr : lastDataDate;

    // Calculate the 7-day window for the current weekOffset
    function getWindowDates(endDate, weekOffset) {
        const end = new Date(endDate);
        end.setDate(end.getDate() - weekOffset * windowSize);
        const dates = [];
        for (let i = windowSize - 1; i >= 0; i--) {
            const d = new Date(end);
            d.setDate(end.getDate() - i);
            dates.push(formatDate(d));
        }
        return dates;
    }

    const windowDates = getWindowDates(endDate, weekOffset);
    const pagedData = windowDates.map(date => {
        const item = dataMap[date];
        return {
            date,
            correct: item ? item.totalCorrectAnswers : 0,
            wrong: item ? item.totalWrongAnswers : 0,
        };
    });

    const series = [
        {
            name: 'Correct',
            data: pagedData.map(item => item.correct)
        },
        {
            name: 'Wrong',
            data: pagedData.map(item => item.wrong)
        }
    ];
    const categories = pagedData.map(item => formatDateLabel(item.date));

    const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            background: 'transparent',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: categories,
            labels: {
                rotate: -45,
                formatter: (val) => val // already formatted
            }
        },
        yaxis: {
            title: { text: 'Attempts' },
            min: 0,
            forceNiceScale: true
        },
        colors: ['#4ade80', '#fca5a5'], // green for correct, red for wrong (both subtle)
        grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4,
        },
        tooltip: {
            y: {
                formatter: val => `${val} attempt${val === 1 ? '' : 's'}`
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        theme: {
            mode: 'light',
        },
    };

    // Navigation logic
    // Don't allow forward if weekOffset is 0 (most recent week)
    const canGoBack = windowDates[0] > (sortedData[0]?.date || windowDates[0]);
    const canGoForward = weekOffset > 0;

    return (

        <div className="w-full max-w-2xl mx-auto  flex flex-col items-center gap-2">
            <h2 className="text-lg font-bold mb-2">Your Daily Quiz Attempts</h2>
            <div className="flex justify-between items-center mb-2 w-full px-4">
                <button
                    className={`px-3 py-1 rounded border transition-colors
                    ${canGoBack ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-900 dark:text-gray-600 dark:border-gray-800'}`}
                    onClick={() => canGoBack && setWeekOffset(weekOffset + 1)}
                    disabled={!canGoBack}
                >
                    ◀
                </button>
                <span className="text-sm text-muted-foreground">
                    {windowDates[0]} - {windowDates[windowDates.length - 1]}
                </span>
                <button
                    className={`px-3 py-1 rounded border transition-colors
                    ${canGoForward ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-900 dark:text-gray-600 dark:border-gray-800'}`}
                    onClick={() => canGoForward && setWeekOffset(weekOffset - 1)}
                    disabled={!canGoForward}
                >
                    ▶
                </button>
            </div>
            <ApexChart options={options} series={series} type="bar" height={320} />
        </div>
    )
}

export default DailyAttempts
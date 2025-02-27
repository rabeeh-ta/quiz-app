'use client';

import { useTheme } from '../context/ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
                {theme === 'light' ? 'Light' : 'Dark'} Mode
            </span>
            <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-950`}
            >
                <span
                    className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
                {theme === 'dark' ? (
                    <span className="sr-only">Switch to light mode</span>
                ) : (
                    <span className="sr-only">Switch to dark mode</span>
                )}
            </button>
        </div>
    );
} 
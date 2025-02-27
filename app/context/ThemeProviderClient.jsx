'use client';

import { ThemeProvider } from './ThemeProvider';

export default function ThemeProviderClient({ children }) {
    return <ThemeProvider>{children}</ThemeProvider>;
} 
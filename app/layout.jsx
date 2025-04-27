import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderClient from "./context/ThemeProviderClient";
import { UserProvider } from "./context/UserContext";
import LayoutWithNavigation from "./layouts/LayoutWithNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz App",
  description: "A quiz application for learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProviderClient>
          <UserProvider>
            <LayoutWithNavigation>
              {children}
            </LayoutWithNavigation>
          </UserProvider>
        </ThemeProviderClient>
      </body>
    </html>
  );
}

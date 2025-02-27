'use client';
import CourseCard from "./components/course-card";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CourseCard title="Bacteriology" description="Learn the fundamentals of Bacteriology" linkUrl="/quiz/bacteriology" linkText="Start Quiz" />
      <div className="col-span-full text-center mt-6">
        <p>Signing in will save your progress.</p>
        <Link className="text-blue-500 hover:text-blue-700" href="/account">
          Create an account
        </Link>
      </div>
    </div>
  );
}

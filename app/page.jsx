'use client';
import CourseCard from "./components/course-card";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CourseCard title="Bacteriology" description="Learn the fundamentals of Bacteriology" linkUrl="/quiz/bacteriology" linkText="Start Quiz" />
    </div>
  );
}

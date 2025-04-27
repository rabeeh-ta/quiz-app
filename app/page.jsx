'use client';
import AuthMiddleware from "./utils/authMiddleware";
import CompactCourseCard from "./components/compact-course-card";
import { useRouter } from "next/navigation";
import subjects from "./data/subjects";
export default function Home() {
  const router = useRouter();


  return (
    <AuthMiddleware>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
        {subjects.map((subject, index) => (
          <CompactCourseCard key={index} title={subject.title} imageUrl={subject.imageUrl} onPractice={() => {
            router.push(`/quiz/${subject.slug}`);
          }} />
        ))}
      </div>
    </AuthMiddleware>
  );
}

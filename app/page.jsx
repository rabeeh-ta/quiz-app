'use client';
import CourseCard from "./components/course-card";
import AuthMiddleware from "./utils/authMiddleware";
import { useUser } from '@/app/context/UserContext';
import CompactCourseCard from "./components/compact-course-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <AuthMiddleware>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
        <CompactCourseCard title="Bacteriology" imageUrl="/course-images/bacteriology.jpeg" onPractice={() => {
          router.push('/quiz/bacteriology');
        }} />
      </div>
    </AuthMiddleware>
  );
}

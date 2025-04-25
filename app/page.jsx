'use client';
import CourseCard from "./components/course-card";
import AuthMiddleware from "./utils/authMiddleware";
import { useUser } from '@/app/context/UserContext';
import CompactCourseCard from "./components/compact-course-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const subjects = [
    {
      title: 'Bacteriology',
      imageUrl: '/course-images/bacteriology.jpeg',
      slug: 'bacteriology'
    },
    {
      title: 'Parasitology',
      imageUrl: '/course-images/parasitology.png',
      slug: 'parasitology'
    },
    {
      title: 'Hematology',
      imageUrl: '/course-images/hematology.jpeg',
      slug: 'hematology'
    },
    {
      title: 'Immunology',
      imageUrl: '/course-images/immunology.jpeg',
      slug: 'immunology'
    },
    {
      title: 'Blood Banking',
      imageUrl: '/course-images/blood-banking.jpeg',
      slug: 'blood-banking'
    },
    {
      title: 'Biochemistry',
      imageUrl: '/course-images/biochemistry.jpeg',
      slug: 'biochemistry'
    }
  ]

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

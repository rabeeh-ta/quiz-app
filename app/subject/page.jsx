'use client';
import CourseCard from '../components/course-card';
import AuthMiddleware from '@/app/utils/authMiddleware';
import { useRouter } from 'next/navigation';
import subjects from '../data/subjects';

export default function ExplorePage() {
    const router = useRouter();

    return (
        <AuthMiddleware>
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <p className="text-muted-foreground mb-6">
                    See all the subjects available.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject, index) => (
                        <CourseCard key={index} {...subject}
                            onPrimaryAction={() => {
                                router.push(`/subject/${subject.slug}`);
                            }}
                            onSecondaryAction={() => {
                                router.push(`/quiz/${subject.slug}`);
                            }}
                        />
                    ))}
                </div>
            </div>
        </AuthMiddleware>
    );
} 
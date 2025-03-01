'use client';
import CourseCard from '../components/course-card';
import AuthMiddleware from '@/app/utils/authMiddleware';

export default function ExplorePage() {
    return (
        <AuthMiddleware>
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <p className="text-muted-foreground mb-6">
                    See all the subjects available.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CourseCard title="Bacteriology" description="Bacteriology is the study of bacteria, their classification, structure, functions, and role in health, disease, and industry." linkUrl="/subject/bacteriology" linkText="See Questions" />
                </div>
            </div>
        </AuthMiddleware>
    );
} 
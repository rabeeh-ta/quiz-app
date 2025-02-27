import BottomNavigation from '@/app/components/BottomNavigation';
import CourseCard from '../components/course-card';

export default function ExplorePage() {
    return (
        <>
            <div className="container">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <p className="text-muted-foreground mb-6">
                    See all the subjects available.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CourseCard title="Bacteriology" description="Learn about bacteria and their properties." linkUrl="/subject/bacteriology" linkText="See Questions" />
                </div>
            </div>
            <BottomNavigation />
        </>
    );
} 
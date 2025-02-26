import BottomNavigation from '@/app/components/BottomNavigation';

export default function ExplorePage() {
    return (
        <>
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Explore</h1>
                <p className="text-muted-foreground mb-6">
                    Discover new quizzes and categories to test your knowledge.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Science</h2>
                        <p className="text-sm text-muted-foreground">Explore science quizzes</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">History</h2>
                        <p className="text-sm text-muted-foreground">Test your history knowledge</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Technology</h2>
                        <p className="text-sm text-muted-foreground">Discover tech quizzes</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Arts</h2>
                        <p className="text-sm text-muted-foreground">Art and culture quizzes</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Sports</h2>
                        <p className="text-sm text-muted-foreground">Test your sports knowledge</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Entertainment</h2>
                        <p className="text-sm text-muted-foreground">Movies, music, and more</p>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </>
    );
} 
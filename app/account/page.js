import BottomNavigation from '@/app/components/BottomNavigation';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
    return (
        <>
            <div className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Account</h1>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-2xl font-semibold">U</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">User Profile</h2>
                            <p className="text-sm text-muted-foreground">Manage your account settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="text-lg font-medium mb-3">Profile Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Username</span>
                                    <span>QuizUser</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Email</span>
                                    <span>user@example.com</span>
                                </div>
                                <Button variant="outline" className="w-full mt-2">Edit Profile</Button>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="text-lg font-medium mb-3">Quiz Statistics</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Quizzes Taken</span>
                                    <span>12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Average Score</span>
                                    <span>78%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Achievements</span>
                                    <span>5</span>
                                </div>
                                <Button variant="outline" className="w-full mt-2">View History</Button>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-4">
                            <h3 className="text-lg font-medium mb-3">Settings</h3>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full">Preferences</Button>
                                <Button variant="outline" className="w-full">Notification Settings</Button>
                                <Button variant="destructive" className="w-full">Log Out</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </>
    );
} 
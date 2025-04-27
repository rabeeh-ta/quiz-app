"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function CourseCard({
    imageUrl = "",
    title = "",
    description = "",
    slug = "",
}) {
    const router = useRouter();
    return (
        <Card className="w-full max-w-md overflow-hidden shadow-md gap-2 bg-white dark:bg-gray-950 dark:border-gray-800">
            <div className="relative h-44 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    priority
                />
            </div>

            <CardHeader className="p-4 pb-2">
                <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            </CardContent>

            <CardFooter className="flex gap-2 p-4 pt-0 flex-wrap">
                <Button variant="outline" className="flex-1 dark:border-gray-700 dark:hover:bg-gray-800" onClick={() => {
                    router.push(`/quiz/${slug}`);
                }}>
                    Practice Quiz
                </Button>
                <Button variant="outline" className="flex-1 dark:border-gray-700 dark:hover:bg-gray-800" onClick={() => {
                    router.push(`/analytics/#${slug}`);
                }}>
                    View Analytics
                </Button>
                <Button variant="default" className="flex-1" onClick={() => {
                    router.push(`/subject/${slug}`);
                }}>
                    See Questions
                </Button>
            </CardFooter>
        </Card>
    )
}


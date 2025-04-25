"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function CompactCourseCard({
    imageUrl = "",
    title = "",
    onPractice = () => { },
}) {
    return (
        <Card className="w-full overflow-hidden shadow-md py-0 bg-white dark:bg-gray-950 dark:border-gray-800">
            <CardContent className="p-4 flex flex-row items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <h2 className="text-base font-medium line-clamp-2 flex-1">{title}</h2>

                <Button
                    variant="default"
                    size="default"
                    onClick={onPractice}
                    className="px-6 py-2 font-semibold flex-shrink-0"
                >
                    Practice
                </Button>
            </CardContent>
        </Card>
    )
}
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
        <Card className="w-full overflow-hidden shadow-sm py-0 bg-white dark:bg-gray-950 dark:border-gray-800">
            <CardContent className="p-2 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h3 className="text-sm font-medium line-clamp-1 flex-1">{title}</h3>
                </div>

                <Button
                    variant="default"
                    size="sm"
                    onClick={onPractice}
                    className="ml-2 flex-shrink-0"
                >
                    Practice
                </Button>
            </CardContent>
        </Card>
    )
}
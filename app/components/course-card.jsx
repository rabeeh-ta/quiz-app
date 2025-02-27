import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function CourseCard({
    title = "Card Title",
    description = "Card Description",
    imageUrl = "/placeholder.svg?height=200&width=200",
    linkUrl = "#",
    linkText = "Start Quiz",
}) {
    return (
        <Card className="w-full overflow-hidden gap-4">
            <CardHeader className="px-4">
                <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            </CardContent>
            <CardFooter className="px-4 pt-0">
                <Button asChild className="w-full">
                    <Link href={linkUrl}>{linkText}</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}


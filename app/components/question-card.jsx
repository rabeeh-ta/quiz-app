"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export default function QuestionCard({
  question = "",
  answer = "",
  description = "",
  attempts = null,
  correctAttempts = null,
  questionId = null,
}) {
  const accuracy = attempts > 0 ? Math.round((correctAttempts / attempts) * 100) : 0

  return (
    <Card className="w-full max-w-lg py-4 gap-4" key={questionId}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <div className="p-4 rounded-md bg-green-50 dark:bg-green-950/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Answer: {answer}</p>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Badge variant="outline" className="text-xs">
          Q-{questionId}
        </Badge>
        {attempts && correctAttempts && <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {correctAttempts}/{attempts} correct
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {accuracy}% accuracy
          </Badge>
        </div>}
      </CardFooter>
    </Card>
  );
}


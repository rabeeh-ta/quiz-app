"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import useAddUserCompletion from "@/app/hooks/useAddUserCompletion"
import { useUser } from "@/app/context/UserContext"

/**
 * Multiple Choice Question Component
 * @param {Object} props
 * @param {string} props.question - The question text
 * @param {Array<{id: string, text: string}>} props.options - Array of options
 * @param {string} props.correctAnswer - ID of the correct answer
 * @param {string} [props.explanation] - Explanation for the correct answer
 */
export default function MCQComponent({
  userId = "",
  questionId = "",
  question = "The mcq question will be displayed here",
  options = [
    { id: "option1", text: "Option 1" },
    { id: "option2", text: "Option 2" },
    { id: "option3", text: "Option 3" },
    { id: "option4", text: "Option 4" },
  ],
  correctAnswer = "option1",
  explanation = "The explanation for the correct answer will be displayed here",
  subject = "",
  handleNext = () => {
    console.log("Next Question")
  },
}) {

  const [selectedOption, setSelectedOption] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { user } = useUser()

  const { addCompletion } = useAddUserCompletion()

  const handleSubmit = () => {
    if (!selectedOption) return

    const correct = selectedOption === correctAnswer
    if (user !== null) {
      addCompletion(user.id, questionId, subject, correct)
    }
    setIsCorrect(correct)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setSelectedOption("")
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-lg border border-gray-200 shadow-sm p-6 bg-white dark:bg-gray-950 dark:border-gray-800">
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        className="space-y-3 mb-6"
        disabled={isSubmitted}>
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center rounded-lg border p-4 transition-colors ${isSubmitted && option.id === correctAnswer
              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
              : isSubmitted && option.id === selectedOption && option.id !== correctAnswer
                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                : selectedOption === option.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-800"
              }`}>
            <RadioGroupItem value={option.id} id={option.id} className="mr-3" />
            <Label htmlFor={option.id} className="w-full cursor-pointer font-medium">
              {option.text}
            </Label>
            {isSubmitted && option.id === correctAnswer && <CheckCircle2 className="ml-auto text-green-500 h-5 w-5" />}
            {isSubmitted && option.id === selectedOption && option.id !== correctAnswer && (
              <XCircle className="ml-auto text-red-500 h-5 w-5" />
            )}
          </div>
        ))}
      </RadioGroup>
      {isSubmitted ? (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${isCorrect
              ? "bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400"
              : "bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400"
              }`}>
            <div className="flex items-center gap-2 font-medium">
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span>{isCorrect ? "Correct!" : "Incorrect!"}</span>
            </div>
            <p className="mt-2 text-sm">{explanation}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReset} className="w-full">
              Try Again
            </Button>
            {isSubmitted && <Button onClick={handleNext} disabled={!selectedOption} className="w-full">
              Next Question
            </Button>}
          </div>
        </div>
      ) : (
        <Button onClick={handleSubmit} disabled={!selectedOption} className="w-full">
          Submit Answer
        </Button>
      )}
    </div>
  );
}


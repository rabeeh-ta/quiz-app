"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import useAddUserCompletion from "@/app/hooks/useAddUserCompletion"
import { useUser } from "@/app/context/UserContext"
import Spinner from "./spinner"
/**
 * Multiple Choice Question Component
 * @param {Object} props
 * @param {string} props.question - The question text
 * @param {Array<{id: string|number, text: string}>} props.options - Array of options
 * @param {string} props.correctAnswer - Text of the correct answer
 * @param {string} [props.explanation] - Explanation for the correct answer
 */
export default function MCQComponent({
  questionId = "",
  question = "",
  options = [],
  correctAnswer = "",
  explanation = "",
  subject = "",
  handleNext = () => { },
  isLoading = false,
  onQuestionResult = () => { }
}) {

  const [selectedOption, setSelectedOption] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { user } = useUser()

  const { addCompletion } = useAddUserCompletion()

  // Find the correct option id based on the correctAnswer text
  const getCorrectOptionId = () => {
    const correctOption = options.find(option => option.text === correctAnswer)
    return correctOption ? correctOption.id : null
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    // Compare selectedOption with the correct option id
    const correctOptionId = getCorrectOptionId()
    const correct = selectedOption === correctOptionId?.toString()

    if (user !== null) {
      addCompletion(user.id, questionId, subject, correct)
    }
    setIsCorrect(correct)
    setIsSubmitted(true)

    // Call the onQuestionResult callback with the result
    onQuestionResult(correct)
  }

  const handleReset = () => {
    setSelectedOption("")
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  // Get the correct option id for comparison in the UI
  const correctOptionId = getCorrectOptionId()

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
            className={`flex items-center rounded-lg border p-4 transition-colors ${isSubmitted && option.id.toString() === correctOptionId?.toString()
              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
              : isSubmitted && option.id.toString() === selectedOption && option.id.toString() !== correctOptionId?.toString()
                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                : selectedOption === option.id.toString()
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-800"
              }`}>
            <RadioGroupItem value={option.id.toString()} id={option.id.toString()} className="mr-3" />
            <Label htmlFor={option.id.toString()} className="w-full cursor-pointer font-medium">
              {option.text}
            </Label>
            {isSubmitted && option.id.toString() === correctOptionId?.toString() && <CheckCircle2 className="ml-auto text-green-500 h-5 w-5" />}
            {isSubmitted && option.id.toString() === selectedOption && option.id.toString() !== correctOptionId?.toString() && (
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
            {/* <Button onClick={handleReset} className="w-full">
              Try Again
            </Button> */}
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


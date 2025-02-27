"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

/**
 * Multiple Choice Question Component
 * @param {Object} props
 * @param {string} props.question - The question text
 * @param {Array<{id: string, text: string}>} props.options - Array of options
 * @param {string} props.correctAnswer - ID of the correct answer
 * @param {string} [props.explanation] - Explanation for the correct answer
 */
export default function MCQComponent({
  question = "What is the capital of France?",
  options = [
    { id: "paris", text: "Paris" },
    { id: "london", text: "London" },
    { id: "berlin", text: "Berlin" },
    { id: "madrid", text: "Madrid" },
  ],
  correctAnswer = "paris",
  explanation = "Paris is the capital and most populous city of France.",
  handleNext = () => {
    console.log("Next Question")
  }
}) {
  const [selectedOption, setSelectedOption] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (!selectedOption) return

    const correct = selectedOption === correctAnswer
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


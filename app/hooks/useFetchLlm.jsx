import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import Ajv from 'ajv';
import { useState } from 'react';

export default function useFetchLlm() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateMCQ = async (question) => {
        if (!question) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Generate 4 multiple-choice options and the correct answer key (0-3) for the question: "${question}". Return the response as a JSON object with "options" (an array of strings) and "answer_key" (a number) and "explanation" (a small explanation for the correct answer) keys.
            
            Don't use any use any ordering for the options. like "A: option1, B: option2, C: option3, D: option4" or "1: option1, 2: option2, 3: option3, 4: option4" or anything like that. Just return the options in a random order.`;

            const googleAI = createGoogleGenerativeAI({
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
            });

            const { text } = await generateText({
                model: googleAI('gemini-2.0-flash'),
                prompt: prompt,
            });

            // console.log('ai response:', text);

            const cleanedText = text.trim().replace(/```json\n?|\n?```/g, '');

            let responseJSON;
            try {
                responseJSON = JSON.parse(cleanedText);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                throw new Error('Failed to parse LLM response as JSON');
            }

            // JSON Schema Validation
            const schema = {
                type: 'object',
                properties: {
                    options: {
                        type: 'array',
                        items: { type: 'string' },
                        minItems: 4,
                        maxItems: 4,
                    },
                    answer_key: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 3,
                    },
                },
                required: ['options', 'answer_key'],
            };

            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(responseJSON);

            if (!valid) {
                throw new Error(`Invalid JSON schema: ${ajv.errorsText(validate.errors)}`);
            }
            setData(responseJSON);
        } catch (error) {
            console.error("Error generating MCQ:", error);
            setError(error.message || "An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, generateMCQ };
}

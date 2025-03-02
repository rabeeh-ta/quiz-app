import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import Ajv from 'ajv';

export default function useFetchLlm() {
    // This function returns a promise that resolves to the MCQ data
    const generateMCQ = (question) => {
        if (!question) {
            return null;
        }

        const prompt = `Generate 4 multiple-choice options and the correct answer key (0-3) for the question: "${question}". Return the response as a JSON object with "options" (an array of strings) and "answer_key" (a number) and "explanation" (a small but detailed easy to understand explanation for the correct answer) keys.
        
        Don't use any use any ordering for the options. like "A: option1, B: option2, C: option3, D: option4" or "1: option1, 2: option2, 3: option3, 4: option4" or anything like that. Just return the options in a random order.`;

        const googleAI = createGoogleGenerativeAI({
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
        });

        // Return the promise directly instead of using async/await
        return generateText({
            model: googleAI('gemini-2.0-flash'),
            prompt: prompt,
        }).then(({ text }) => {
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
                        type: 'number',
                        minimum: 0,
                        maximum: 3,
                    },
                    explanation: {
                        type: 'string'
                    }
                },
                required: ['options', 'answer_key'],
            };

            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(responseJSON);

            if (!valid) {
                throw new Error(`Invalid JSON schema: ${ajv.errorsText(validate.errors)}`);
            }

            return responseJSON; // Return the data directly
        });
    };

    return { generateMCQ };
}

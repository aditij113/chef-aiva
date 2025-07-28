
import { GoogleGenAI, Type } from "@google/genai";

const mealSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: 'Creative name of the meal.' },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of ingredients used.' },
        instructions: {
            type: Type.ARRAY,
            description: 'A list of cooking instruction steps.',
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING, description: 'A single step of the recipe instructions.' }
                },
                required: ['description']
            }
        },
    },
    required: ['name', 'ingredients', 'instructions']
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }

        const { prompt: userPrompt } = await request.json();

        if (!userPrompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required.' }), { status: 400 });
        }

        const prompt = `
          You are Chef Aiva, an expert AI nutritionist and chef specializing in creating delicious, healthy, plant-based meal plans.
          Based on the user's request, create a single, creative, plant-based recipe.
          
          User Request: "${userPrompt}"

          Instructions:
          1. Provide a creative recipe name, a list of ingredients, and structured step-by-step preparation instructions. Each instruction step should be a distinct object in an array.
          2. Ensure the recipes are plant-based.
          3. Return the response in the specified JSON format.
        `;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: mealSchema
            }
        });

        const responseText = response.text.trim();
        const generatedMeal = JSON.parse(responseText);
        
        return new Response(JSON.stringify(generatedMeal), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Error generating recipe:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

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

        const { url } = await request.json();

        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required.' }), { status: 400 });
        }

        const prompt = `
          You are Chef Aiva, an expert AI nutritionist and chef.
          A user has provided a URL: "${url}". While you cannot access external websites, infer the recipe from the URL and generate a plausible, delicious, plant-based recipe that would likely be found there.
          
          Instructions:
          1. Create a recipe name, a list of ingredients, and structured step-by-step preparation instructions based on the URL's likely content.
          2. For example, if the URL is "allrecipes.com/recipe/creamy-tomato-pasta", create a plant-based version of Creamy Tomato Pasta.
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
        console.error('Error parsing URL:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
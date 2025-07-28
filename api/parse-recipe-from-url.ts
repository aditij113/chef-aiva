import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required.' });
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

        return res.status(200).json(generatedMeal);

    } catch (error: any) {
        console.error('Error parsing URL:', error);
        return res.status(500).json({ error: error.message });
    }
}

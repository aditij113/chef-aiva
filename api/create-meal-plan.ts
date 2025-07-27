
import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences } from "../types";

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

        const { preferences, ingredients } = (await request.json()) as { preferences: UserPreferences; ingredients: string[] };

        const prompt = `
          You are Chef Aiva, an expert AI nutritionist and chef specializing in creating delicious, healthy, plant-based meal plans.
          Create a personalized 7-day meal plan for one person based on the following preferences and available ingredients.

          User Preferences:
          - Meals Per Week: ${preferences.mealsPerWeek}
          - Max Cooking Time Per Meal: ${preferences.cookingTime} minutes
          - Health Goals: ${preferences.healthGoals.join(', ') || 'None'}
          - Dietary Needs: ${preferences.dietaryNeeds.join(', ') || 'None'}
          - Health Focus Areas: ${preferences.healthFocus.join(', ') || 'None'}

          Available Ingredients:
          - ${ingredients.join(', ')}

          Instructions:
          1. The meal plan must cover 7 days (Monday to Sunday).
          2. For each meal, provide a creative recipe name, a list of ingredients (using ONLY from the provided "Available Ingredients" list), and structured step-by-step preparation instructions. Each instruction step should be a distinct object in an array.
          3. Strictly adhere to the user's dietary needs and health focus.
          4. Ensure the recipes are plant-based.
          5. Return the response in the specified JSON format.
        `;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        weeklyPlan: {
                            type: Type.ARRAY,
                            description: 'A 7-day meal plan.',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    day: { type: Type.STRING, description: 'Day of the week (e.g., Monday).' },
                                    breakfast: { ...mealSchema, nullable: true },
                                    lunch: { ...mealSchema, nullable: true },
                                    dinner: { ...mealSchema, nullable: true },
                                },
                                required: ['day', 'breakfast', 'lunch', 'dinner']
                            }
                        }
                    },
                    required: ['weeklyPlan']
                }
            }
        });
        
        const responseText = response.text.trim();
        const generatedPlan = JSON.parse(responseText);

        return new Response(JSON.stringify(generatedPlan), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Error generating meal plan:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
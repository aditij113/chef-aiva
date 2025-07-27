
import { GoogleGenAI } from "@google/genai";

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }

        const { prompt, aspectRatio = '16:9' } = (await request.json()) as { prompt: string; aspectRatio?: AspectRatio };
        
        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required.' }), { status: 400 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        let imageUrl = null;
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        }

        return new Response(JSON.stringify({ imageUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Error generating image:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
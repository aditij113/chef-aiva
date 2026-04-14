import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }

        const { prompt, aspectRatio = '16:9' } = req.body as { prompt: string; aspectRatio?: AspectRatio };
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001',
            prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio,
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error('Image generation returned no results. Check your API key, model access, and account quota.');
        }

        const imageBytes = response.generatedImages[0]?.image?.imageBytes;
        if (!imageBytes) {
            throw new Error('Image generation succeeded but returned no image bytes. Verify API access and model output format.');
        }

        const imageUrl = `data:image/jpeg;base64,${imageBytes}`;
        return res.status(200).json({ imageUrl });

    } catch (error: any) {
        console.error('Error generating image:', error);
        return res.status(500).json({ error: error.message });
    }
}

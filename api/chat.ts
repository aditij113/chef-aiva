import { GoogleGenAI, Chat, Part } from "@google/genai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ChatRequestBody {
    history: { role: 'user' | 'model'; parts: Part[] }[];
    message: Part[];
    systemInstruction: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }

        const { history, message, systemInstruction } = req.body as ChatRequestBody;
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
              systemInstruction: systemInstruction,
            },
        });

        const stream = await chat.sendMessageStream({ message });
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        
        for await (const chunk of stream) {
            const chunkText = chunk.text;
            if (chunkText) {
                res.write(chunkText);
            }
        }
        
        res.end();

    } catch (error: any) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: error.message });
    }
}


import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Chat, Part } from "@google/genai";

interface ChatRequestBody {
    history: { role: 'user' | 'model'; parts: Part[] }[];
    message: Part[];
    systemInstruction: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
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
        
        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        // Pipe the stream to the response
        for await (const chunk of stream) {
            const chunkText = chunk.text;
            if (chunkText) {
                res.write(chunkText);
            }
        }
        
        // End the response when the stream is done
        res.end();

    } catch (error: any) {
        console.error('Chat API error:', error);
        // If an error occurs before streaming starts, we can send a JSON error.
        // If it happens during, the connection might already be established.
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        } else {
            // If headers are already sent, we can't send a JSON error.
            // We just end the response. The client will see a broken stream.
            res.end();
        }
    }
}

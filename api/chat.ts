
import { GoogleGenAI, Chat, Part } from "@google/genai";

interface ChatRequestBody {
    history: { role: 'user' | 'model'; parts: Part[] }[];
    message: Part[];
    systemInstruction: string;
}

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable was not set.");
        }

        const { history, message, systemInstruction } = (await request.json()) as ChatRequestBody;
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        // Start a new chat session with the provided history and system instruction
        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
              systemInstruction: systemInstruction,
            },
        });

        // Get the streaming response from the model
        const stream = await chat.sendMessageStream({ message });
        
        // Create a new ReadableStream to send back to the client
        const responseStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const chunkText = chunk.text;
                        if (chunkText) {
                            controller.enqueue(new TextEncoder().encode(chunkText));
                        }
                    }
                } catch(err: any) {
                    console.error('Error during stream processing:', err);
                    controller.error(err);
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(responseStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error: any) {
        console.error('Chat API error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import type { Part } from '@google/genai';

const suggestedPrompts = [
    "What's a good substitute for parsley?",
    "Can you see if the color and consistency of my masoor dal looks right?",
    "How do I properly dice an onion?",
    "Is this avocado ripe?",
];

// Helper function to convert a File to a base64 string for JSON transport
async function fileToBase64(file: File): Promise<{ mimeType: string, data: string }> {
    const reader = new FileReader();
    const promise = new Promise<{ mimeType: string, data: string }>((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = () => {
            const result = reader.result as string;
            const data = result.split(',')[1];
            resolve({ mimeType: file.type, data });
        };
    });
    reader.readAsDataURL(file);
    return promise;
}


interface ChatInterfaceProps {
    systemInstruction: string;
    showSuggestions?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ systemInstruction, showSuggestions = true }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSendMessage = async (prompt: string) => {
        if ((!prompt.trim() && !selectedImage) || isLoading) return;

        setIsLoading(true);
        const userMessageText = prompt.trim();

        // Add user message to UI
        setMessages(prev => [...prev, { role: 'user', text: userMessageText, imageUrl: imagePreview }]);
        setInputText('');
        
        try {
            const messageParts: Part[] = [];
            if (selectedImage) {
                const { mimeType, data } = await fileToBase64(selectedImage);
                messageParts.push({ inlineData: { mimeType, data } });
            }
            if (userMessageText) {
                messageParts.push({ text: userMessageText });
            }
            
            // Clear image after preparing parts
            setSelectedImage(null);
            setImagePreview(null);
            
            // Construct history for the API
            const history = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }] // Simplified for this example; a real app might need to handle images in history
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history,
                    message: messageParts,
                    systemInstruction
                }),
            });

            if (!response.body) {
                throw new Error("No response body");
            }

            // Add empty model message to start populating
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunkText = decoder.decode(value);
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'model') {
                        lastMessage.text += chunkText;
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.role === 'user' ? 'bg-emerald-500 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100'}`}>
                            {msg.imageUrl && <img src={msg.imageUrl} alt="User upload" className="rounded-lg mb-2 max-h-48" />}
                            <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex justify-start">
                        <div className="max-w-xs rounded-2xl p-3 bg-white shadow-sm rounded-bl-lg border border-gray-100">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <footer className="bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
                {showSuggestions && messages.length === 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {suggestedPrompts.map(prompt => (
                            <button key={prompt} onClick={() => handleSendMessage(prompt)} className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm rounded-full hover:bg-emerald-200 transition-colors">
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
                {imagePreview && (
                    <div className="relative w-24 h-24 mb-2 p-1 border rounded-lg bg-gray-100">
                        <img src={imagePreview} alt="Selected preview" className="w-full h-full object-cover rounded"/>
                        <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">&times;</button>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <input type="file" accept="image/*" capture="environment" onChange={handleImageSelect} ref={fileInputRef} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} aria-label="Take a photo" className="p-2 text-gray-500 hover:text-emerald-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow font-sans"
                    />
                    <button onClick={() => handleSendMessage(inputText)} disabled={isLoading || (!inputText.trim() && !selectedImage)} className="p-3 bg-emerald-600 text-white rounded-full disabled:bg-gray-400 hover:bg-emerald-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.768 59.768 0 0121.485 12a59.77 59.77 0 01-18.216 8.874L6 12zM6 12h9" /></svg>
                    </button>
                </div>
            </footer>
        </>
    );
};

export default ChatInterface;

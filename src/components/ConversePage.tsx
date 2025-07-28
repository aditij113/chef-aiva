import React from 'react';
import Header from './Header';
import ChatInterface from './ChatInterface';

const ConversePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const systemInstruction = "You are Chef Aiva, a friendly and knowledgeable AI kitchen assistant. Be concise, helpful, and encouraging. Your expertise is in plant-based cooking.";
    
    return (
        <div className="flex flex-col h-full bg-stone-100">
             <div className="px-4 pt-6 bg-transparent border-b border-gray-200">
                <Header
                    title="Converse with Aiva"
                    subtitle="Your AI kitchen assistant"
                    onBack={onBack}
                />
            </div>
            <ChatInterface
                systemInstruction={systemInstruction}
                key="main-chat"
            />
        </div>
    );
};

export default ConversePage;

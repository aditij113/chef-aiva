import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2.293 2.293a1 1 0 01-1.414 0L4 12m16 8l-2.293-2.293a1 1 0 00-1.414 0L14 20l2.293-2.293a1 1 0 000-1.414L14 14" />
    </svg>
);


interface InstantRecipePageProps {
    onBack: () => void;
    onGenerate: (prompt: string) => void;
    error: string | null;
}

const InstantRecipePage: React.FC<InstantRecipePageProps> = ({ onBack, onGenerate, error }) => {
    const [prompt, setPrompt] = useState('');

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="px-4 pt-6">
                 <Header
                    title="Instant Recipe"
                    subtitle="Tell Aiva what you're craving or what you have on hand."
                    onBack={onBack}
                 />
            </div>
            <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col">
                {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A savory recipe that uses tomatoes, swiss chard, and cilantro"
                    className="w-full flex-1 p-4 bg-white border border-gray-300 rounded-lg text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow"
                />
            </main>
            <Footer>
                <button
                    onClick={() => onGenerate(prompt)}
                    disabled={!prompt.trim()}
                    className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-lg flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <SparklesIcon />
                    Generate Recipe
                </button>
            </Footer>
        </div>
    );
};

export default InstantRecipePage;

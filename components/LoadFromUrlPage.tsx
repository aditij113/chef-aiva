import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);


interface LoadFromUrlPageProps {
    onBack: () => void;
    onLoad: (url: string) => void;
    error: string | null;
}

const LoadFromUrlPage: React.FC<LoadFromUrlPageProps> = ({ onBack, onLoad, error }) => {
    const [url, setUrl] = useState('');

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="px-4 pt-6">
                 <Header
                    title="Load from URL"
                    subtitle="Paste a link to a recipe and Aiva will do the rest."
                    onBack={onBack}
                 />
            </div>
            <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-center">
                 {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.example.com/recipe"
                    className="w-full p-4 bg-white border border-gray-300 rounded-lg text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow"
                />
            </main>
            <Footer>
                <button
                    onClick={() => onLoad(url)}
                    disabled={!url.trim()}
                    className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-lg flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <LinkIcon />
                    Load Recipe
                </button>
            </Footer>
        </div>
    );
};

export default LoadFromUrlPage;



import React, { useState, useEffect } from 'react';
import type { Meal } from '../types';
import Header from './Header';
import Footer from './Footer';

const CookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const ImageSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-200 text-gray-500">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
    <p className="text-sm mt-2">Generating image...</p>
  </div>
);

interface RecipeDetailPageProps {
    meal: Meal;
    onBack: () => void;
    onStartCooking: () => void;
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ meal, onBack, onStartCooking }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generateImage = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const prompt = `A vibrant, appetizing, high-quality photograph of "${meal.name}". The dish is beautifully plated on a clean, modern ceramic plate, looks delicious, and is clearly plant-based. The lighting is bright and natural.`;
                const response = await fetch('/api/generate-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, aspectRatio: '16:9' }),
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }
                
                const { imageUrl } = await response.json();

                if (imageUrl) {
                    setImageUrl(imageUrl);
                } else {
                    setError('Could not generate an image for this meal.');
                }
            } catch (e: any) {
                console.error(e);
                setError(`Failed to generate meal image. ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        generateImage();
    }, [meal]);

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-6">
                 <Header
                    title={meal.name}
                    subtitle="Ready to get cooking?"
                    onBack={onBack}
                 />
            </div>
            <main className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-lg">
                    {isLoading && <ImageSpinner />}
                    {error && <div className="flex items-center justify-center h-full bg-red-100 text-red-600 p-4 text-center">{error}</div>}
                    {imageUrl && <img src={imageUrl} alt={`A generated image of ${meal.name}`} className="w-full h-full object-cover" />}
                </div>
                
                <div className="space-y-4">
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-emerald-200 pb-1">Ingredients</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {meal.ingredients.map((ing, i) => (
                                <li key={i}>{ing}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-emerald-200 pb-1">Instructions</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                            {meal.instructions.map((step, i) => (
                                <li key={i}>{step.description}</li>
                            ))}
                        </ol>
                    </section>
                </div>
            </main>
            <Footer>
                <button
                    onClick={onStartCooking}
                    className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-lg flex items-center justify-center"
                >
                    <CookIcon />
                    Start Cooking
                </button>
            </Footer>
        </div>
    );
};

export default RecipeDetailPage;

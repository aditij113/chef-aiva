

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Meal } from '../types';
import Header from './Header';
import Footer from './Footer';
import ChatInterface from './ChatInterface';

const ImageSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full bg-gray-200 text-gray-500">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
    <p className="text-sm mt-2">Visualizing step...</p>
  </div>
);

interface CookingViewProps {
    meal: Meal;
    instructionIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onFinish: () => void;
    onBack: () => void;
}

const CookingView: React.FC<CookingViewProps> = ({ meal, instructionIndex, onNext, onPrev, onFinish, onBack }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [stepImageUrl, setStepImageUrl] = useState<string | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState<string | null>(null);

    const instructions = meal.instructions;
    const currentInstruction = instructions[instructionIndex] || null;
    const totalSteps = instructions.length;
    const isLastStep = instructionIndex === totalSteps - 1;

    useEffect(() => {
        const generateImageForStep = async () => {
            if (!currentInstruction) return;

            setIsImageLoading(true);
            setImageError(null);
            setStepImageUrl(null);

             if (!process.env.API_KEY) {
                setImageError('API key is not configured.');
                setIsImageLoading(false);
                return;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const response = await ai.models.generateImages({
                    model: 'imagen-3.0-generate-002',
                    prompt: `A vibrant, clear, high-quality photograph showing the result of this cooking step for a plant-based recipe called "${meal.name}": "${currentInstruction.description}". The setting is a clean, modern kitchen. The focus is on the food. The lighting is bright and natural.`,
                    config: {
                      numberOfImages: 1,
                      outputMimeType: 'image/jpeg',
                      aspectRatio: '4:3',
                    },
                });

                if (response.generatedImages && response.generatedImages.length > 0) {
                    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                    setStepImageUrl(`data:image/jpeg;base64,${base64ImageBytes}`);
                } else {
                    setImageError('Could not generate an image for this step.');
                }
            } catch (e) {
                console.error(e);
                setImageError('Failed to generate image for step.');
            } finally {
                setIsImageLoading(false);
            }
        };

        generateImageForStep();
    }, [instructionIndex, meal, currentInstruction]);


    const systemInstructionForThisStep = `
      You are Chef Aiva, a helpful AI kitchen assistant. The user is currently cooking "${meal.name}".
      They are on step ${instructionIndex + 1} of ${totalSteps}: "${currentInstruction?.description}".
      Answer their questions concisely and directly related to this specific step. Be encouraging and clear.
    `;

    return (
        <div className="flex flex-col h-full bg-transparent">
            <div className="px-4 pt-6">
                <Header
                    title={meal.name}
                    subtitle="Follow along step-by-step"
                    progress={{ current: instructionIndex + 1, total: totalSteps }}
                    onBack={onBack}
                />
            </div>
            <main className="flex-1 flex flex-col justify-center items-center text-center p-4">
                <div className="w-full h-56 bg-gray-200 rounded-lg mb-6 overflow-hidden shadow-lg">
                    {isImageLoading && <ImageSpinner />}
                    {imageError && <div className="flex items-center justify-center h-full bg-red-100 text-red-600 p-4 text-center">{imageError}</div>}
                    {stepImageUrl && <img src={stepImageUrl} alt={`A generated image for step ${instructionIndex + 1}`} className="w-full h-full object-cover" />}
                </div>
                
                <p className="text-3xl md:text-4xl font-display font-bold text-gray-800 leading-tight">
                    {currentInstruction?.description}
                </p>
            </main>
            
            <div className={`fixed bottom-0 left-0 right-0 w-full max-w-[420px] mx-auto transition-transform duration-500 ease-in-out ${isChatOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ height: '75%'}}>
                 <div className="bg-stone-100 h-full flex flex-col border-t-2 border-gray-200 shadow-2xl rounded-t-2xl">
                    <ChatInterface
                        key={instructionIndex} // Resets chat state for each new step
                        systemInstruction={systemInstructionForThisStep}
                        showSuggestions={false}
                    />
                </div>
            </div>

            <Footer>
                <div className="w-full flex justify-between items-center">
                    <button
                        onClick={onPrev}
                        disabled={instructionIndex === 0}
                        className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-sm hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>

                    <button
                        onClick={() => setIsChatOpen(prev => !prev)}
                        className="text-emerald-600 font-bold"
                        aria-label="Ask Aiva"
                    >
                        {isChatOpen ? 'Close Chat' : 'Ask Aiva'}
                    </button>
                    
                    <button
                        onClick={isLastStep ? onFinish : onNext}
                        className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
                    >
                        {isLastStep ? 'Finish' : 'Next'}
                    </button>
                </div>
            </Footer>
        </div>
    );
};

export default CookingView;
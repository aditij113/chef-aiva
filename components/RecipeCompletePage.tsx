import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { RecipeRating } from '../types';

const StarIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
    <button onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${filled ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    </button>
);

const Rating: React.FC<{ label: string, value: number, onRate: (rating: number) => void }> = ({ label, value, onRate }) => (
    <div className="text-center">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < value} onClick={() => onRate(i + 1)} />
            ))}
        </div>
    </div>
);

const Confetti: React.FC = () => {
    // Basic CSS confetti effect
    const confettiPieces = [...Array(15)].map((_, i) => (
        <div 
            key={i}
            className="confetti-piece" 
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'][Math.floor(Math.random() * 5)]
            }}
        />
    ));
    return (
        <>
            <style>{`
                .confetti-piece {
                    position: absolute;
                    width: 8px;
                    height: 16px;
                    opacity: 0;
                    animation: fall 3s linear infinite;
                }
                @keyframes fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">{confettiPieces}</div>
        </>
    );
};


interface RecipeCompletePageProps {
    mealName: string;
    onDone: () => void;
}

const RecipeCompletePage: React.FC<RecipeCompletePageProps> = ({ mealName, onDone }) => {
    const [rating, setRating] = useState<RecipeRating>({ taste: 0, ease: 0 });

    const handleRate = (category: keyof RecipeRating, value: number) => {
        setRating(prev => ({...prev, [category]: value}));
    };

    return (
         <div className="flex flex-col h-full bg-transparent relative">
            <Confetti />
            <div className="px-4 pt-6">
                <Header
                    title="You did it!"
                    subtitle={`Enjoy your delicious ${mealName}!`}
                />
            </div>
            <main className="flex-1 flex flex-col justify-center items-center text-center p-4 space-y-8">
                 <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg space-y-6">
                    <h3 className="text-xl font-display font-bold text-gray-800">How was it?</h3>
                    <Rating label="Taste" value={rating.taste} onRate={(val) => handleRate('taste', val)} />
                    <Rating label="Ease of Cooking" value={rating.ease} onRate={(val) => handleRate('ease', val)} />
                </div>
            </main>
            <Footer>
                <button
                    onClick={onDone}
                    className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-lg flex items-center justify-center"
                >
                    Done
                </button>
            </Footer>
        </div>
    );
};

export default RecipeCompletePage;
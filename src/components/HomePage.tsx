

import React from 'react';
import Header from './Header';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2.293 2.293a1 1 0 01-1.414 0L4 12m16 8l-2.293-2.293a1 1 0 00-1.414 0L14 20l2.293-2.293a1 1 0 000-1.414L14 14" />
    </svg>
);

const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);


interface ActionButtonProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:bg-emerald-50 hover:-translate-y-1 border border-gray-100"
    >
        <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
            {icon}
        </div>
        <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </button>
);

interface HomePageProps {
    onLoadMealPlan: () => void;
    onInstantRecipe: () => void;
    onLoadFromUrl: () => void;
    onDiscover: () => void;
    onBack: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoadMealPlan, onInstantRecipe, onLoadFromUrl, onDiscover, onBack }) => {

    return (
        <div className="flex flex-col h-full bg-transparent">
             <div className="px-4 pt-6">
                <Header
                    title="What's Cooking?"
                    subtitle="How would you like to get started today?"
                    onBack={onBack}
                />
            </div>
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                <ActionButton 
                    onClick={onLoadMealPlan}
                    icon={<CalendarIcon />}
                    title="Load from Meal Plan"
                    description="View your personalized weekly meals."
                />
                <ActionButton 
                    onClick={onInstantRecipe}
                    icon={<SparklesIcon />}
                    title="Instant Recipe"
                    description="Tell Aiva what ingredients you have."
                />
                 <ActionButton 
                    onClick={onLoadFromUrl}
                    icon={<LinkIcon />}
                    title="Load from URL"
                    description="Import a recipe from any website."
                />
                <ActionButton 
                    onClick={() => alert("Create Your Own clicked!")}
                    icon={<PlusCircleIcon />}
                    title="Create Your Own"
                    description="Build a recipe from scratch to save."
                />
                <ActionButton 
                    onClick={onDiscover}
                    icon={<SearchIcon />}
                    title="Discover Recipes"
                    description="Search new ideas from the community."
                />
            </main>
        </div>
    );
};

export default HomePage;

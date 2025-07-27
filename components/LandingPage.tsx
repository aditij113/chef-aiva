import React from 'react';
import Header from './Header';
import LandingIllustration from './LandingIllustration';

const CookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ConverseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const DiscoverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const BuildPlanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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


interface LandingPageProps {
    onCook: () => void;
    onConverse: () => void;
    onDiscover: () => void;
    onBuildPlan: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCook, onConverse, onDiscover, onBuildPlan }) => {
    return (
        <div className="flex flex-col h-full bg-transparent">
             <div className="px-4 pt-6">
                <Header
                    title={<span>Welcome to <span className="text-emerald-600">Chef Aiva</span></span>}
                    subtitle="Your AI companion for healthy eating."
                />
            </div>
            <div className='flex-shrink-0 flex items-center justify-center p-4'>
                <LandingIllustration className="w-48 h-48" />
            </div>
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                <ActionButton
                    onClick={onCook}
                    icon={<CookIcon />}
                    title="Cook"
                    description="I want to make a specific meal now."
                />
                <ActionButton
                    onClick={onConverse}
                    icon={<ConverseIcon />}
                    title="Converse"
                    description="Chat with Aiva for tips and tricks."
                />
                <ActionButton
                    onClick={onDiscover}
                    icon={<DiscoverIcon />}
                    title="Discover"
                    description="Explore recipes and ingredients."
                />
                 <ActionButton
                    onClick={onBuildPlan}
                    icon={<BuildPlanIcon />}
                    title="Build Meal Plan"
                    description="Create a new personalized weekly plan."
                />
            </main>
        </div>
    );
};

export default LandingPage;
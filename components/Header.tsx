import React from 'react';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface HeaderProps {
    step?: number;
    title: React.ReactNode;
    subtitle: string;
    onBack?: () => void;
    progress?: { current: number; total: number };
}

const Header: React.FC<HeaderProps> = ({ step, title, subtitle, onBack, progress }) => {
    return (
        <header className="mb-4 text-center relative">
            {onBack && (
                <button 
                    onClick={onBack} 
                    aria-label="Go back"
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 z-10"
                >
                    <BackIcon />
                </button>
            )}
            <div className="px-10">
                 <h1 className="text-3xl font-display font-bold text-gray-800 leading-tight">
                    {step && <span className="text-emerald-600">Step {step}:</span>}
                    {progress && <span className="text-emerald-600">Step {progress.current} / {progress.total}</span>}
                    {(step || progress) ? <br/> : ''} {title}
                </h1>
                <p className="text-base text-gray-500 mt-2 font-sans">
                    {subtitle}
                </p>
            </div>
        </header>
    );
};

export default Header;
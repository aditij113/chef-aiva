import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import {
    breakfastRecipes,
    lunchRecipes,
    dinnerRecipes,
    superfoods,
    herbsAndSpices,
    healthyHabits,
} from '../data/discover-data';

interface DiscoverPageProps {
    onBack: () => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-transparent">
             <div className="px-4 pt-6 pb-2">
                <Header
                    title="Discover"
                    subtitle="Explore recipes and learn about ingredients."
                    onBack={onBack}
                />
            </div>
             <main className="flex-grow overflow-y-auto space-y-6 pb-6">
                <Carousel title="Breakfast to start your day right" items={breakfastRecipes} />
                <Carousel title="Quick & Healthy Lunches" items={lunchRecipes} />
                <Carousel title="Satisfying Dinners" items={dinnerRecipes} />
                <Carousel title="Superfood Spotlight" items={superfoods} />
                <Carousel title="Guide to Herbs & Spices" items={herbsAndSpices} />
                <Carousel title="Healthy Habits" items={healthyHabits} />
            </main>
        </div>
    );
};

export default DiscoverPage;
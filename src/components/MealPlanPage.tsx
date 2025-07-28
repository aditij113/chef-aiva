import React, { useState } from 'react';
import type { MealPlan, Meal } from '../types';

interface MealPlanPageProps {
  plan: MealPlan;
  onSelectMeal: (meal: Meal) => void;
}

const MealCard: React.FC<{ meal: Meal | null, type: string, onSelect: (meal: Meal) => void }> = ({ meal, type, onSelect }) => {
  if (!meal || !meal.name || meal.name.toLowerCase().includes('leftover')) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="font-bold text-gray-500">{type}</h4>
        <p className="text-sm text-gray-400">{meal?.name || 'No meal planned.'}</p>
      </div>
    );
  }

  return (
    <button 
      onClick={() => onSelect(meal)} 
      className="w-full text-left bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 hover:shadow-md"
    >
      <h4 className="font-bold text-emerald-700">{type}</h4>
      <p className="text-base font-semibold text-gray-800">{meal.name}</p>
    </button>
  );
};

const DayAccordion: React.FC<{ dayPlan: MealPlan['weeklyPlan'][0], isOpen: boolean, onClick: () => void, onSelectMeal: (meal: Meal) => void }> = ({ dayPlan, isOpen, onClick, onSelectMeal }) => {
  return (
    <div className="border-b border-gray-200">
      <button onClick={onClick} className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors">
        <h3 className="text-lg font-bold text-gray-800">{dayPlan.day}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 space-y-3">
          <MealCard meal={dayPlan.breakfast} type="Breakfast" onSelect={onSelectMeal} />
          <MealCard meal={dayPlan.lunch} type="Lunch" onSelect={onSelectMeal} />
          <MealCard meal={dayPlan.dinner} type="Dinner" onSelect={onSelectMeal} />
        </div>
      )}
    </div>
  );
}

const MealPlanPage: React.FC<MealPlanPageProps> = ({ plan, onSelectMeal }) => {
  const [openDay, setOpenDay] = useState<string>(plan.weeklyPlan[0]?.day || '');

  const handleToggleDay = (day: string) => {
    setOpenDay(prev => prev === day ? '' : day);
  };

  return (
    <main className="space-y-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {plan.weeklyPlan.map((dayPlan) => (
          <DayAccordion 
            key={dayPlan.day} 
            dayPlan={dayPlan} 
            isOpen={openDay === dayPlan.day}
            onClick={() => handleToggleDay(dayPlan.day)}
            onSelectMeal={onSelectMeal}
          />
        ))}
      </div>
    </main>
  );
};

export default MealPlanPage;

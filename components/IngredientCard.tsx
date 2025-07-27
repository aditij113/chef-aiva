

import React from 'react';
import type { Ingredient } from '../types';
import AnimatedIngredientIcon from './AnimatedIngredientIcon';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(ingredient.id)}
      aria-label={ingredient.name}
      aria-selected={isSelected}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(ingredient.id)}
      className={`relative rounded-xl cursor-pointer group transition-all duration-300 overflow-hidden shadow-sm flex flex-col items-center justify-center p-2 aspect-square
        ${isSelected ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'bg-white border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:-translate-y-1'}`}
    >
      <div className="flex-grow flex items-center justify-center w-full">
          <AnimatedIngredientIcon name={ingredient.name} className="w-12 h-12" />
      </div>

      <h3 className="w-full font-bold text-gray-800 text-center text-sm tracking-wide mt-1">
          {ingredient.name}
      </h3>

      {isSelected && (
        <div className="absolute top-1 right-1">
           <CheckIcon className="w-6 h-6 text-emerald-500 bg-white rounded-full p-0.5 shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default IngredientCard;
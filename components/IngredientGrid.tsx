import React from 'react';
import type { Ingredient } from '../types';
import IngredientCard from './IngredientCard';

interface IngredientGridProps {
    ingredients: Ingredient[];
    selectedIngredients: Set<string>;
    onSelectIngredient: (id: string) => void;
}

const IngredientGrid: React.FC<IngredientGridProps> = ({ ingredients, selectedIngredients, onSelectIngredient }) => {
    return (
        <div className="flex-1">
            {ingredients.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                    {ingredients.map((ingredient) => (
                        <IngredientCard
                            key={ingredient.id}
                            ingredient={ingredient}
                            isSelected={selectedIngredients.has(ingredient.id)}
                            onSelect={onSelectIngredient}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-sm p-8">
                    <p className="text-gray-500">Select a category to see ingredients.</p>
                </div>
            )}
        </div>
    );
};

export default IngredientGrid;
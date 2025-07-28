import React from 'react';
import FormSlider from './FormSlider';
import OptionPill from './OptionPill';
import type { UserPreferences } from '../types';

const healthGoals = ['Lose Weight', 'Build Muscle', 'More Energy', 'Improve Digestion', 'Heart Health'];
const dietaryNeeds = ['Gluten-Free', 'Low FODMAP', 'Dairy-Free', 'Soy-Free', 'Nut-Free'];
const healthFocus = ['Low Iron', 'Vitamin D', 'Blood Sugar', 'Cholesterol', 'Inflammation'];

interface MealPlanFormProps {
    preferences: UserPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ preferences, setPreferences }) => {
    
    const handleSliderChange = (field: keyof UserPreferences, value: number) => {
        setPreferences(prev => ({ ...prev, [field]: value }));
    };

    const toggleSelection = (field: 'healthGoals' | 'dietaryNeeds' | 'healthFocus', item: string) => {
        setPreferences(prev => {
            const currentSelection = new Set(prev[field]);
            if (currentSelection.has(item)) {
                currentSelection.delete(item);
            } else {
                currentSelection.add(item);
            }
            return { ...prev, [field]: Array.from(currentSelection) };
        });
    };

    return (
        <main className="space-y-6">
            <FormSlider 
                label="Meals Per Week"
                value={preferences.mealsPerWeek}
                min={1}
                max={21}
                unit=""
                onChange={(e) => handleSliderChange('mealsPerWeek', Number(e.target.value))}
            />
            <FormSlider 
                label="Max Cooking Time"
                value={preferences.cookingTime}
                min={15}
                max={90}
                unit=" min"
                onChange={(e) => handleSliderChange('cookingTime', Number(e.target.value))}
            />
            
            <section>
                <h3 className="text-base font-bold text-gray-700 mb-3">Health Goals</h3>
                <div className="flex flex-wrap gap-2">
                    {healthGoals.map(goal => (
                        <OptionPill key={goal} label={goal} isSelected={preferences.healthGoals.includes(goal)} onClick={() => toggleSelection('healthGoals', goal)} />
                    ))}
                </div>
            </section>
            
            <section>
                <h3 className="text-base font-bold text-gray-700 mb-3">Dietary Needs</h3>
                <div className="flex flex-wrap gap-2">
                    {dietaryNeeds.map(need => (
                        <OptionPill key={need} label={need} isSelected={preferences.dietaryNeeds.includes(need)} onClick={() => toggleSelection('dietaryNeeds', need)} />
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-base font-bold text-gray-700 mb-3">Health Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                    {healthFocus.map(focus => (
                        <OptionPill key={focus} label={focus} isSelected={preferences.healthFocus.includes(focus)} onClick={() => toggleSelection('healthFocus', focus)} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MealPlanForm;

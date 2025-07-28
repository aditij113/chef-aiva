
export interface Ingredient {
  id: string;
  name: string;
}

export interface Category {
  name:string;
  ingredients: Ingredient[];
}

export interface UserPreferences {
    mealsPerWeek: number;
    cookingTime: number;
    healthGoals: string[];
    dietaryNeeds: string[];
    healthFocus: string[];
}

export interface InstructionStep {
    description: string;
}

export interface Meal {
    name: string;
    ingredients: string[];
    instructions: InstructionStep[];
}

export interface DailyPlan {
    day: string;
    breakfast: Meal | null;
    lunch: Meal | null;
    dinner: Meal | null;
}

export interface MealPlan {
    weeklyPlan: DailyPlan[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
}

export interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface RecipeRating {
  taste: number;
  ease: number;
}
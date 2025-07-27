

import React, { useState, useMemo } from 'react';
import { INGREDIENT_CATEGORIES } from './constants';
import IngredientGrid from './components/IngredientGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import MealPlanForm from './components/MealPlanForm';
import MealPlanPage from './components/MealPlanPage';
import LoadingSpinner from './components/LoadingSpinner';
import HomePage from './components/HomePage';
import RecipeDetailPage from './components/RecipeDetailPage';
import LandingPage from './components/LandingPage';
import ConversePage from './components/ConversePage';
import DiscoverPage from './components/DiscoverPage';
import CookingView from './components/CookingView';
import RecipeCompletePage from './components/RecipeCompletePage';
import InstantRecipePage from './components/InstantRecipePage';
import LoadFromUrlPage from './components/LoadFromUrlPage';
import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, MealPlan, Meal } from './types';

type View = 'landing' | 'cook' | 'converse' | 'discover' | 'mealPlanSetup';
type SetupPage = 'grocery' | 'planning' | 'loading' | 'mealplan';
type HomeView = 'dashboard' | 'mealplan' | 'recipe' | 'cooking' | 'completed' | 'instantRecipe' | 'loadFromUrl' | 'loadingRecipe';

const App: React.FC = () => {
  // Top-level navigation state
  const [view, setView] = useState<View>('landing');

  // Sub-view states
  const [setupPage, setSetupPage] = useState<SetupPage>('grocery');
  const [homeView, setHomeView] = useState<HomeView>('dashboard');
  
  // Data State
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState<UserPreferences>({
    mealsPerWeek: 7,
    cookingTime: 30,
    healthGoals: [],
    dietaryNeeds: [],
    healthFocus: [],
  });
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState({title: '', message: ''});
  
  // Cooking Flow State
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  const handleSelectIngredient = (id: string) => {
    setSelectedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedIngredientNames = useMemo(() => {
    const names = new Set<string>();
    for (const category of INGREDIENT_CATEGORIES) {
      for (const ingredient of category.ingredients) {
        if (selectedIngredients.has(ingredient.id)) {
          names.add(ingredient.name);
        }
      }
    }
    return Array.from(names);
  }, [selectedIngredients]);

  const allIngredientIds = useMemo(() => {
    const ids: string[] = [];
    INGREDIENT_CATEGORIES.forEach(category => 
      category.ingredients.forEach(ingredient => ids.push(ingredient.id))
    );
    return ids;
  }, []);

  const allIngredientsSelected = useMemo(() => 
    selectedIngredients.size === allIngredientIds.length, 
    [selectedIngredients, allIngredientIds]
  );

  const handleToggleSelectAll = () => {
    if (allIngredientsSelected) {
      setSelectedIngredients(new Set());
    } else {
      setSelectedIngredients(new Set(allIngredientIds));
    }
  };

  const mealSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'Creative name of the meal.' },
      ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of ingredients used.' },
      instructions: { 
          type: Type.ARRAY,
          description: 'A list of cooking instruction steps.',
          items: {
              type: Type.OBJECT,
              properties: {
                  description: { type: Type.STRING, description: 'A single step of the recipe instructions.' }
              },
              required: ['description']
          }
      },
    },
    required: ['name', 'ingredients', 'instructions']
  };

  const handleCreatePlan = async () => {
    setSetupPage('loading');
    setLoadingMessage({title: 'Chef Aiva is thinking...', message: 'Creating your delicious meal plan!'});
    setError(null);

    const prompt = `
      You are Chef Aiva, an expert AI nutritionist and chef specializing in creating delicious, healthy, plant-based meal plans.
      Create a personalized 7-day meal plan for one person based on the following preferences and available ingredients.

      User Preferences:
      - Meals Per Week: ${preferences.mealsPerWeek}
      - Max Cooking Time Per Meal: ${preferences.cookingTime} minutes
      - Health Goals: ${preferences.healthGoals.join(', ') || 'None'}
      - Dietary Needs: ${preferences.dietaryNeeds.join(', ') || 'None'}
      - Health Focus Areas: ${preferences.healthFocus.join(', ') || 'None'}

      Available Ingredients:
      - ${selectedIngredientNames.join(', ')}

      Instructions:
      1. The meal plan must cover 7 days (Monday to Sunday).
      2. For each meal, provide a creative recipe name, a list of ingredients (using ONLY from the provided "Available Ingredients" list), and structured step-by-step preparation instructions. Each instruction step should be a distinct object in an array.
      3. Strictly adhere to the user's dietary needs and health focus.
      4. Ensure the recipes are plant-based.
      5. Return the response in the specified JSON format.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              weeklyPlan: {
                type: Type.ARRAY,
                description: 'A 7-day meal plan.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: 'Day of the week (e.g., Monday).' },
                    breakfast: { ...mealSchema, nullable: true },
                    lunch: { ...mealSchema, nullable: true },
                    dinner: { ...mealSchema, nullable: true },
                  },
                  required: ['day', 'breakfast', 'lunch', 'dinner']
                }
              }
            },
            required: ['weeklyPlan']
          }
        }
      });
      
      const responseText = response.text.trim();
      const generatedPlan = JSON.parse(responseText);
      setMealPlan(generatedPlan);
      setSetupPage('mealplan');
    } catch (e) {
      console.error(e);
      setError('Sorry, I had trouble creating your meal plan. Please try again.');
      setSetupPage('planning');
    }
  };

  const handleGenerateInstantRecipe = async (userPrompt: string) => {
    setHomeView('loadingRecipe');
    setLoadingMessage({title: 'Working my magic...', message: 'Creating a unique recipe just for you!'});
    setError(null);
    
    const prompt = `
      You are Chef Aiva, an expert AI nutritionist and chef specializing in creating delicious, healthy, plant-based meal plans.
      Based on the user's request, create a single, creative, plant-based recipe.
      
      User Request: "${userPrompt}"

      Instructions:
      1. Provide a creative recipe name, a list of ingredients, and structured step-by-step preparation instructions. Each instruction step should be a distinct object in an array.
      2. Ensure the recipes are plant-based.
      3. Return the response in the specified JSON format.
    `;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: mealSchema
            }
        });
        const responseText = response.text.trim();
        const generatedMeal = JSON.parse(responseText);
        setSelectedMeal(generatedMeal);
        setHomeView('recipe');
    } catch(e) {
        console.error(e);
        setError('Sorry, I had trouble creating a recipe. Please try a different prompt.');
        setHomeView('instantRecipe');
    }
  };

  const handleParseRecipeFromUrl = async (url: string) => {
    setHomeView('loadingRecipe');
    setLoadingMessage({title: 'Working my magic...', message: 'Analyzing the recipe from the URL!'});
    setError(null);
    
    const prompt = `
      You are Chef Aiva, an expert AI nutritionist and chef.
      A user has provided a URL: "${url}". While you cannot access external websites, infer the recipe from the URL and generate a plausible, delicious, plant-based recipe that would likely be found there.
      
      Instructions:
      1. Create a recipe name, a list of ingredients, and structured step-by-step preparation instructions based on the URL's likely content.
      2. For example, if the URL is "allrecipes.com/recipe/creamy-tomato-pasta", create a plant-based version of Creamy Tomato Pasta.
      3. Return the response in the specified JSON format.
    `;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: mealSchema
            }
        });
        const responseText = response.text.trim();
        const generatedMeal = JSON.parse(responseText);
        setSelectedMeal(generatedMeal);
        setHomeView('recipe');
    } catch(e) {
        console.error(e);
        setError('Sorry, I had trouble parsing that URL. Please try a different one.');
        setHomeView('loadFromUrl');
    }
  };
  
  const handleStartMealPlanSetup = () => {
    // Reset states for a fresh setup
    setSetupPage('grocery');
    setSelectedIngredients(new Set());
    setPreferences({
      mealsPerWeek: 7,
      cookingTime: 30,
      healthGoals: [],
      dietaryNeeds: [],
      healthFocus: [],
    });
    setMealPlan(null);
    setError(null);
    setHomeView('dashboard');
    setSelectedMeal(null);
    setView('mealPlanSetup');
  };

  const handleConfirmMeals = () => {
    setView('landing'); // After confirming initial plan, go to landing
  };

  const handleStartCooking = () => {
    setCurrentInstructionIndex(0);
    setHomeView('cooking');
  };
  
  const renderHomeView = () => { // "Cook" mode
    switch(homeView) {
        case 'dashboard':
            return (
                 <HomePage 
                    onLoadMealPlan={() => setHomeView('mealplan')} 
                    onInstantRecipe={() => setHomeView('instantRecipe')}
                    onLoadFromUrl={() => setHomeView('loadFromUrl')}
                    onDiscover={() => setView('discover')}
                    onBack={() => setView('landing')} 
                 />
            );
        case 'instantRecipe':
            return (
                <InstantRecipePage
                    onBack={() => setHomeView('dashboard')}
                    onGenerate={handleGenerateInstantRecipe}
                    error={error}
                />
            );
        case 'loadFromUrl':
            return (
                <LoadFromUrlPage
                    onBack={() => setHomeView('dashboard')}
                    onLoad={handleParseRecipeFromUrl}
                    error={error}
                />
            );
        case 'loadingRecipe':
            return <LoadingSpinner title={loadingMessage.title} message={loadingMessage.message} />
        case 'mealplan':
            return (
                 <>
                    <div className="h-full overflow-y-auto">
                        <div className="px-4 pt-6 pb-4">
                             <Header
                                title="Your Meal Plan"
                                subtitle="Select a meal to see the full recipe."
                                onBack={() => setHomeView('dashboard')}
                             />
                             {mealPlan ? <MealPlanPage plan={mealPlan} onSelectMeal={(meal) => { setSelectedMeal(meal); setHomeView('recipe'); }} /> : <p className="text-center text-gray-500 p-8">No meal plan available. Go to "Build Meal Plan" to create one!</p>}
                        </div>
                    </div>
                </>
            );
        case 'recipe':
            if (!selectedMeal) return null;
            return (
                 <RecipeDetailPage 
                    meal={selectedMeal} 
                    onBack={() => { setHomeView(mealPlan ? 'mealplan' : 'dashboard'); setError(null); }}
                    onStartCooking={handleStartCooking}
                 />
            )
        case 'cooking':
            if (!selectedMeal) return null;
             return (
                <CookingView
                    meal={selectedMeal}
                    instructionIndex={currentInstructionIndex}
                    onNext={() => setCurrentInstructionIndex(i => i + 1)}
                    onPrev={() => setCurrentInstructionIndex(i => i - 1)}
                    onFinish={() => setHomeView('completed')}
                    onBack={() => setHomeView('recipe')}
                />
            );
        case 'completed':
            if (!selectedMeal) return null;
            return (
                <RecipeCompletePage
                    mealName={selectedMeal.name}
                    onDone={() => setHomeView('dashboard')}
                />
            );
        default:
            return <HomePage onLoadMealPlan={() => {}} onInstantRecipe={() => {}} onLoadFromUrl={() => {}} onDiscover={() => {}} onBack={() => setView('landing')} />;
    }
  };

  const renderSetupFlow = () => {
    switch(setupPage) {
      case 'grocery':
        return (
          <>
            <div className="h-full overflow-y-auto">
              <div className="px-4 pt-6 pb-32">
                <Header
                  step={1}
                  title="Build Your Store"
                  subtitle="Let's stock your pantry with your favorite ingredients."
                  onBack={() => setView('landing')}
                />
                <div className="my-4">
                  <button
                    onClick={handleToggleSelectAll}
                    className="w-full text-center py-2 px-4 rounded-lg bg-emerald-100 text-emerald-700 font-bold hover:bg-emerald-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    {allIngredientsSelected ? 'Deselect All' : 'Select All Ingredients'}
                  </button>
                </div>
                <main className="space-y-4">
                  {INGREDIENT_CATEGORIES.map((category) => (
                    <section key={category.name} aria-labelledby={category.name.replace(/[\s&]+/g, '-').toLowerCase()}>
                      <h2
                        id={category.name.replace(/[\s&]+/g, '-').toLowerCase()}
                        className="text-lg font-display font-bold text-gray-800 mb-3 pb-1 border-b-2 border-emerald-200"
                      >
                        {category.name}
                      </h2>
                      <IngredientGrid
                        ingredients={category.ingredients}
                        selectedIngredients={selectedIngredients}
                        onSelectIngredient={handleSelectIngredient}
                      />
                    </section>
                  ))}
                </main>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <Footer>
                  <p className="text-base font-medium text-gray-700">
                    <span className="font-bold text-emerald-600">{selectedIngredients.size}</span> Ingredients
                  </p>
                  <button
                      className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-base"
                      disabled={selectedIngredients.size === 0}
                      onClick={() => setSetupPage('planning')}
                  >
                      Save & Continue
                  </button>
              </Footer>
            </div>
          </>
        );
      case 'planning':
        return (
          <>
            <div className="h-full overflow-y-auto">
              <div className="px-4 pt-6 pb-32">
                <Header
                  step={2}
                  title="Your Preferences"
                  subtitle="Help us customize the perfect meal plan for you."
                  onBack={() => setSetupPage('grocery')}
                />
                {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
                <MealPlanForm preferences={preferences} setPreferences={setPreferences} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <Footer>
                <div />
                <button
                    className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-base"
                    onClick={handleCreatePlan}
                >
                    Create My Plan
                </button>
              </Footer>
            </div>
          </>
        );
      case 'loading':
        return <LoadingSpinner title={loadingMessage.title} message={loadingMessage.message} />;
      case 'mealplan':
        return (
           <>
            <div className="h-full overflow-y-auto">
              <div className="px-4 pt-6 pb-32">
                <Header
                  step={3}
                  title="Your Meal Plan"
                  subtitle="Here is your personalized week of delicious meals!"
                  onBack={() => setSetupPage('planning')}
                />
                {mealPlan ? <MealPlanPage plan={mealPlan} onSelectMeal={() => {}} /> : <p>No meal plan generated.</p>}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <Footer>
                <div/>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-lg cursor-not-allowed text-base"
                    disabled
                  >
                    Make Changes
                  </button>
                  <button
                    className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-base"
                    onClick={handleConfirmMeals}
                  >
                    Confirm Meals
                  </button>
                </div>
              </Footer>
            </div>
          </>
        );
    }
  }

  const renderContent = () => {
    switch (view) {
      case 'cook':
        return renderHomeView();
      case 'converse':
        return <ConversePage onBack={() => setView('landing')} />;
      case 'discover':
        return <DiscoverPage onBack={() => setView('landing')} />;
      case 'mealPlanSetup':
        return renderSetupFlow();
      case 'landing':
      default:
        return (
          <LandingPage
            onCook={() => setView('cook')}
            onConverse={() => setView('converse')}
            onDiscover={() => setView('discover')}
            onBuildPlan={handleStartMealPlanSetup}
          />
        );
    }
  };

  return (
    <div className="font-sans text-gray-900 flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-[420px] h-[850px] bg-[#FDFCFB] shadow-2xl overflow-hidden relative border-[12px] border-black">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
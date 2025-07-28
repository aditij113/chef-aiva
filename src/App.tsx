
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

  const handleCreatePlan = async () => {
    setSetupPage('loading');
    setLoadingMessage({title: 'Chef Aiva is thinking...', message: 'Creating your delicious meal plan!'});
    setError(null);

    try {
      const response = await fetch('/api/create-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, ingredients: selectedIngredientNames }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || `Server error: ${response.statusText}`);
      }
      
      const generatedPlan = await response.json();
      setMealPlan(generatedPlan);
      setSetupPage('mealplan');
    } catch (e: any) {
      console.error(e);
      setError(`Sorry, I had trouble creating your meal plan. ${e.message}`);
      setSetupPage('planning');
    }
  };

  const handleGenerateInstantRecipe = async (userPrompt: string) => {
    setHomeView('loadingRecipe');
    setLoadingMessage({title: 'Working my magic...', message: 'Creating a unique recipe just for you!'});
    setError(null);
    
    try {
        const response = await fetch('/api/generate-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userPrompt }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Server error: ${response.statusText}`);
        }

        const generatedMeal = await response.json();
        setSelectedMeal(generatedMeal);
        setHomeView('recipe');
    } catch(e: any) {
        console.error(e);
        setError(`Sorry, I had trouble creating a recipe. Please try a different prompt. ${e.message}`);
        setHomeView('instantRecipe');
    }
  };

  const handleParseRecipeFromUrl = async (url: string) => {
    setHomeView('loadingRecipe');
    setLoadingMessage({title: 'Working my magic...', message: 'Analyzing the recipe from the URL!'});
    setError(null);
    
    try {
        const response = await fetch('/api/parse-recipe-from-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
        
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Server error: ${response.statusText}`);
        }

        const generatedMeal = await response.json();
        setSelectedMeal(generatedMeal);
        setHomeView('recipe');
    } catch(e: any) {
        console.error(e);
        setError(`Sorry, I had trouble parsing that URL. Please try a different one. ${e.message}`);
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
                <div className="flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto">
                        <div className="px-4 pt-6 pb-4">
                             <Header
                                title="Your Meal Plan"
                                subtitle="Select a meal to see the full recipe."
                                onBack={() => setHomeView('dashboard')}
                             />
                             {mealPlan ? <MealPlanPage plan={mealPlan} onSelectMeal={(meal) => { setSelectedMeal(meal); setHomeView('recipe'); }} /> : <p className="text-center text-gray-500 p-8">No meal plan available. Go to "Build Meal Plan" to create one!</p>}
                        </div>
                    </div>
                </div>
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
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              <div className="px-4 pt-6 pb-4">
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
        );
      case 'planning':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              <div className="px-4 pt-6 pb-4">
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
        );
      case 'loading':
        return <LoadingSpinner title={loadingMessage.title} message={loadingMessage.message} />;
      case 'mealplan':
        return (
           <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              <div className="px-4 pt-6 pb-4">
                <Header
                  step={3}
                  title="Your Meal Plan"
                  subtitle="Here is your personalized week of delicious meals!"
                  onBack={() => setSetupPage('planning')}
                />
                {mealPlan ? <MealPlanPage plan={mealPlan} onSelectMeal={() => {}} /> : <p>No meal plan generated.</p>}
              </div>
            </div>
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
    <div className="w-full max-w-md mx-auto flex flex-col h-full bg-[#FDFCFB] shadow-lg">
      {renderContent()}
    </div>
  );
};

export default App;

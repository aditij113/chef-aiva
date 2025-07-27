
# Chef Aiva - Your AI Kitchen Companion

![Chef Aiva Landing Page](https://i.imgur.com/8Qj8j3l.png)

**Chef Aiva** is an interactive web application that acts as your personal AI companion for food. It's designed to help you source, cook, and share healthy, plant-based recipes with ease. Powered by the Google Gemini API, Chef Aiva provides a seamless and delightful experience for everything from meal planning to real-time cooking assistance.

This project was built to demonstrate a modern, responsive, and AI-driven user experience in a mobile-first format.

---

## ✨ Core Features

*   **Personalized Meal Plan Generation:**
    *   **Build Your Store:** Interactively select your available ingredients from a visual pantry.
    *   **Set Preferences:** Define your dietary needs, health goals, and how much time you have to cook.
    *   **AI-Powered Plan:** Gemini generates a complete 7-day, plant-based meal plan tailored to your inputs.

*   **Interactive Cook Mode:**
    *   **Guided Instructions:** Don't just read a recipe; cook along with step-by-step, full-screen instructions.
    *   **Visuals for Every Step:** Gemini generates a unique, high-quality image for each cooking step, so you know exactly what your food should look like.
    *   **Context-Aware Chat:** Get stuck on a step? Open a chat window to ask Chef Aiva for help. The AI knows which step you're on and provides relevant advice.

*   **Converse Mode:**
    *   A general-purpose chat interface to ask Chef Aiva anything about cooking, ingredients, or nutrition.
    *   Includes image upload functionality so you can get visual feedback (e.g., "Is my dal the right consistency?").

*   **Discover Mode:**
    *   A beautiful, scrollable interface for exploring recipe ideas and learning about ingredients.
    *   Features carousels for breakfast, lunch, dinner, superfoods, and healthy habits.

*   **Flexible Recipe Sourcing:**
    *   **Instant Recipe:** Don't have a plan? Just tell Aiva what ingredients you have, and it will generate a recipe on the spot.
    *   **Load from URL:** Found a recipe online? Paste the URL, and Aiva will parse it into a structured format, ready for Cook Mode.

---

## 🛠️ Tech Stack

*   **Frontend:** [React](https://reactjs.org/) with TypeScript
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling.
*   **AI:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash` for text/chat, `imagen-3.0-generate-002` for image generation).
*   **No Build Step:** The project is written using modern ES modules and an import map, allowing it to run directly in the browser without a bundler like Webpack or Vite.

---

## 🚀 Getting Started

You can get a local copy of Chef Aiva up and running in just a few minutes.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   A code editor like [VS Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
*   A **Google AI API Key**. You can get one from the [AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/chef-aiva.git
    cd chef-aiva
    ```

2.  **Set up your API Key:**
    The application is designed to use an environment variable for the API key, but since it runs entirely in the browser, we need to provide the key directly.

    *   Find every instance of `process.env.API_KEY` in the codebase (it appears in `App.tsx`, `RecipeDetailPage.tsx`, `CookingView.tsx`, and `ChatInterface.tsx`).
    *   Replace `process.env.API_KEY` with your actual Google AI API Key as a string:

    **From:**
    ```javascript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```

    **To:**
    ```javascript
    const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY_GOES_HERE' });
    ```
    > **⚠️ Security Warning:** This method is only for local development and testing. Do not commit your API key to a public repository.

3.  **Run the application:**
    *   Open the project folder in VS Code.
    *   Right-click on the `index.html` file and select "Open with Live Server".
    *   Your browser will open, and the Chef Aiva app will be running!

---

## 🌐 Deployment

The easiest way to deploy this application and share it with others is by using a free service like **Vercel** or **Netlify**.

1.  Push your code to a GitHub repository.
2.  Sign up for Vercel/Netlify and connect your GitHub account.
3.  Import the repository.
4.  For a real deployment, you would convert the API calls to use serverless functions to protect your API key. This involves creating an `/api` directory and moving the Gemini logic there. The frontend would then call your own API endpoints instead of Google's directly.

---

## 🔮 Future Ideas

*   **"Create Your Own" Mode:** Fully implement the feature to allow users to build, save, and share their own recipes.
*   **User Accounts:** Add authentication to save meal plans, favorite recipes, and custom ingredients.
*   **Community Sharing:** Allow users to share their creations and meal plans with friends or the community.
*   **Shopping List Generation:** Automatically create a shopping list based on a generated meal plan.


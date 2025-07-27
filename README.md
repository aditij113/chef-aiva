
# Chef Aiva - Your AI Kitchen Companion

![Chef Aiva Landing Page](https://i.imgur.com/8Qj8j3l.png)

**Chef Aiva** is an interactive web application that acts as your personal AI companion for food. It's designed to help you source, cook, and share healthy, plant-based recipes with ease. Powered by the Google Gemini API, Chef Aiva provides a seamless and delightful experience for everything from meal planning to real-time cooking assistance.

This project was built to demonstrate a modern, responsive, and AI-driven user experience in a mobile-first format. It now uses a secure, serverless backend architecture to protect API keys, making it suitable for real-world deployment.

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

*   **Flexible Recipe Sourcing:**
    *   **Instant Recipe:** Don't have a plan? Just tell Aiva what ingredients you have, and it will generate a recipe on the spot.
    *   **Load from URL:** Found a recipe online? Paste the URL, and Aiva will parse it into a structured format, ready for Cook Mode.

---

## 🛠️ Tech Stack

*   **Frontend:** [React](https://reactjs.org/) with TypeScript.
*   **Backend:** [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions) running Node.js.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling.
*   **AI:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash` for text/chat, `imagen-3.0-generate-002` for image generation).
*   **Deployment:** [Vercel](https://vercel.com).

---

## 🚀 Getting Started & Deployment

The recommended way to run and deploy this application is through Vercel, as it's designed to work seamlessly with the serverless backend architecture.

### Prerequisites

*   A [GitHub](https://github.com/) account.
*   A [Vercel](https://vercel.com) account (the free "Hobby" plan is sufficient).
*   A **Google AI API Key**. You can get one from the [AI Studio](https://aistudio.google.com/app/apikey).

### Deployment Instructions

1.  **Fork the Repository:**
    *   Click the "Fork" button at the top-right of the GitHub page to create your own copy of this project.

2.  **Clone your forked repository:**
    ```sh
    git clone https://github.com/your-username/chef-aiva.git
    cd chef-aiva
    ```

3.  **Deploy on Vercel:**
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Import the Git Repository you just cloned. Vercel will automatically detect the project settings.

4.  **Set Environment Variable:**
    *   In your Vercel project settings, navigate to the "Environment Variables" section.
    *   Add a new variable:
        *   **Name:** `API_KEY`
        *   **Value:** Paste your Google AI API Key here.
    *   Ensure the variable is available to all environments (Production, Preview, Development).

5.  **Deploy:**
    *   Click the "Deploy" button. Vercel will build your site and deploy the serverless functions.
    *   Once complete, you'll have a live, shareable URL for your application! Your API key is now securely stored on Vercel's servers and is not exposed to the public.

### Local Development

Running the app locally requires the Vercel CLI to properly emulate the serverless function environment.

1.  **Install Vercel CLI:**
    ```sh
    npm install -g vercel
    ```
2.  **Link your project:**
    ```sh
    vercel link
    ```
3.  **Pull environment variables:**
    ```sh
    vercel env pull .env.development.local
    ```
    This creates a local file with the `API_KEY` you set on Vercel.
4.  **Run the development server:**
    ```sh
    vercel dev
    ```
    This will start a local server (usually on `http://localhost:3000`) that runs both your frontend code and the serverless functions in the `/api` directory.

---

## 🔮 Future Ideas

*   **"Create Your Own" Mode:** Fully implement the feature to allow users to build, save, and share their own recipes.
*   **User Accounts:** Add authentication to save meal plans, favorite recipes, and custom ingredients.
*   **Community Sharing:** Allow users to share their creations and meal plans with friends or the community.
*   **Shopping List Generation:** Automatically create a shopping list based on a generated meal plan.

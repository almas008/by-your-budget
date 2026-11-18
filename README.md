# By Your Budget 💰

> Shop only what fits your pocket. A mobile-first web app to find and purchase items strictly within your custom budget.

## ✨ Features

- **Public Experience First**: Browse items, filter categories, inspect product details, and test budget limits without being blocked by a sign-up wall.
- **Isolated User Databases**: Every user gets a private isolated database in local storage and IndexedDB.
- **Gated Authentication**: Users are prompted to sign up or log in only when taking critical actions (like placing an order).
- **Personal Order Tracking**: View and cancel active orders belonging exclusively to your account.
- **AI Shopping Assistant**: On Screen 2 (Checkout), tap **"✨ Get Some Help"** to get AI-powered insights on item quality, durability, community sentiment, and verified buyer reviews.
- **Graceful Fallbacks**: If the AI model or backend is offline, the app delivers a friendly feedback summary with verified buyer reviews instead of cryptic error messages.
- **Secrets Protection**: API keys are securely managed on the backend and never exposed to the client.

## 🚀 Live Demo

Hosted with GitHub Pages:
`https://<your-username>.github.io/by-your-budget/`

## 📁 Project Structure

```text
├── index.html       # Mobile-first frontend layout & screens
├── styles.css       # Clean, responsive light green theme styling
├── app.js           # Client application logic, user DBs, and AI handlers
├── server.js        # Zero-dependency Node.js AI backend server
├── server.py        # Zero-dependency Python 3 AI backend server
├── .env.example     # Template for configuring secret API keys
└── .gitignore       # Prevents secret keys and node_modules from being committed
```

## 🛠️ Local Backend Setup (Optional)

To enable live AI quality evaluations using your own Gemini API key:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Put your key in `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```
3. Start the server:
   - **Node.js**: `node server.js`
   - **Python**: `python server.py`

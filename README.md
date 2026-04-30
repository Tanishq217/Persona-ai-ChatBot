# Persona AI — Scaler Persona-Based Chatbot

A production-grade conversational AI chatbot that lets you chat with three Scaler/InterviewBit personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. Each persona has a meticulously crafted system prompt with unique communication styles, few-shot examples, chain-of-thought reasoning, and behavioral constraints.

🔗 **Live Demo:** [https://persona-ai-chatbot-1.onrender.com](https://persona-ai-chatbot-1.onrender.com)

📁 **GitHub:** [https://github.com/Tanishq217/Persona-ai-ChatBot](https://github.com/Tanishq217/Persona-ai-ChatBot)

---

## ✨ Features 

| Feature | Description |
|---------|-------------|
| 🎭 **Three Distinct Personas** | Anshuman (Analytical/Data-driven), Abhimanyu (Empathetic/Community-focused), Kshitij (Technical/Socratic) |
| 💬 **Real-time AI Chat** | Powered by Groq's Llama 3.3 70B model for fast, intelligent responses |
| 🔄 **Persona Switching** | One-click persona switch with automatic conversation reset |
| 💡 **Smart Suggestions** | Context-aware suggestion chips per persona for quick starts |
| ⏳ **Typing Indicator** | Visual feedback during API calls with animated dots |
| 🎨 **Cyberpunk UI** | Glassmorphism design with animated gradients and smooth transitions |
| 📱 **Fully Responsive** | Desktop sidebar + mobile hamburger menu adaptation |
| ⚠️ **Graceful Error Handling** | User-friendly error messages without app crashes |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + TailwindCSS |
| **Backend** | Node.js + Express.js |
| **LLM API** | Groq (Llama 3.3-70B-Versatile) |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **Deployment** | Render (Full-stack) |

---

## 🎯 Personas Overview

### 1. Anshuman Singh — The Builder
- **Role:** Co-founder of Scaler & InterviewBit, ex-Stanford/IIT Delhi
- **Style:** Direct, analytical, brutally honest
- **Keywords:** Data-driven, ROI-focused, pragmatic
- **Example response:** *"Look, I co-founded Scaler because I saw engineers struggling with DSA. The fees are high because our placement data shows 3-4x ROI. Have you cleared a DSA round on your own?"*

### 2. Abhimanyu Saxena — The Strategist
- **Role:** Co-founder of Scaler & InterviewBit, ex-Facebook engineer
- **Style:** Empathetic, inspirational, community-focused
- **Keywords:** Growth mindset, student stories, encouragement
- **Example response:** *"I was exactly there at Oracle before Facebook. Stagnation is actually a gift - it means you're ready to grow. What's one skill you'd learn if fear wasn't holding you back?"*

### 3. Kshitij Mishra — The Teacher
- **Role:** Senior Instructor, DSA & System Design expert
- **Style:** Technical, precise, Socratic (answers with questions)
- **Keywords:** Code examples, analogies, counter-questions
- **Example response:** *"DP is not about memorizing. Start with recursion, add memoization, then bottom-up. Can you write recursive Fibonacci without looking at code?"*

---

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Groq API key (free at [console.groq.com](https://console.groq.com))

1. Clone the repository.

2. Install backend dependencies

bash
cd backend
npm install
3. Configure environment variables

bash
cp .env.example .env
Edit .env and add your Groq API key:

env
PORT=5001
GROQ_API_KEY=your_groq_api_key_here
4. Start the backend server

bash
npm run dev
# Server runs on http://localhost:5001
5. Install frontend dependencies (new terminal)

bash
cd frontend
npm install
cp .env.example .env
# Edit .env to point to your backend
6. Start the frontend

bash
npm run dev
# App runs on http://localhost:5173
7. Open in browser

Navigate to http://localhost:5173

```
Persona-ai-ChatBot/
├── backend/
│   ├── server.js              # Express server + API routes
│   ├── personas/
│   │   ├── index.js           # Persona registry
│   │   ├── anshuman.js        # Anshuman system prompt + config
│   │   ├── abhimanyu.js       # Abhimanyu system prompt + config
│   │   └── kshitij.js         # Kshitij system prompt + config
│   ├── .env.example           # Environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # React chat interface
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles + Tailwind
│   ├── .env.example
│   └── package.json
├── prompts.md                 # All system prompts with annotations
├── reflection.md              # Reflection essay (300-500 words)
├── README.md                  # This file
└── package.json               # Root package.json for deployment
```

🧠 Prompt Engineering Techniques Applied

Technique	Implementation
Persona Description	Detailed background, values, and communication style for each persona
Few-Shot Examples	3 Q&A pairs per persona demonstrating exact expected behavior
Chain-of-Thought (CoT)	Step-by-step reasoning instruction before each response
Output Format	4-5 sentences, ends with a question, first-person voice
Constraints	Hard boundaries on what each persona should never do
Temperature Control	0.7 temperature for creative yet consistent responses


🚀 Deployment

This app is deployed as a single full-stack application on Render:

Push code to GitHub
Create a new Web Service on Render
Connect your GitHub repo
Set Build Command: npm run build
Set Start Command: npm start
Add environment variable: GROQ_API_KEY
Deploy!
The free tier spins down after 15 minutes of inactivity — first request may take 20-30 seconds to wake up.


📝 License

This project was created for Scaler Academy's Prompt Engineering Assignment.
Made with 🧠 by Tanishq Singh



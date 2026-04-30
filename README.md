# 🎯 Persona-Based AI Chatbot - Scaler Edition

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](YOUR_DEPLOYED_URL_HERE)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/Tanishq217/Persona-ai-ChatBot)

Chat with authentic AI personas of Scaler's co-founders and lead instructor. Each persona has distinct communication styles, few-shot examples, and chain-of-thought reasoning.

## ✨ Features
- **3 Unique Personas:** Anshuman Singh (Analytical), Abhimanyu Saxena (Empathetic), Kshitij Mishra (Socratic)
- **Persona Switching:** Reset conversation with one click
- **Suggestion Chips:** Pre-built questions per persona
- **Typing Indicator:** Visual feedback during API calls
- **Mobile Responsive:** Works on all devices

## 🛠️ Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **AI API:** Groq (Llama 3 70B)
- **Deployment:** Vercel (Frontend) + Render (Backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Groq API key (free at console.groq.com)

### Backend Setup
```bash
cd backend
npm install
echo "GROQ_API_KEY=your_key_here" > .env
npm run dev  # Runs on port 5001

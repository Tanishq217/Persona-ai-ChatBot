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

### 1. Clone the repository
```bash
git clone https://github.com/Tanishq217/Persona-ai-ChatBot.git
cd Persona-ai-ChatBot

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

// Import persona registry
const { PERSONAS, getPersona } = require('./personas');

const app = express();

// CORS fix for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Check if API key exists
if (!process.env.GROQ_API_KEY) {
  console.error('❌ ERROR: GROQ_API_KEY not found in .env file');
  console.log('Please create .env file with: GROQ_API_KEY=your_key_here');
  process.exit(1);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    personas: Object.keys(PERSONAS),
    timestamp: new Date().toISOString()
  });
});

// Get persona details endpoint
app.get('/api/personas/:personaId', (req, res) => {
  const { personaId } = req.params;
  const persona = getPersona(personaId);
  
  if (!persona) {
    return res.status(404).json({ error: 'Persona not found' });
  }
  
  res.json({
    id: persona.id,
    name: persona.name,
    title: persona.title,
    suggestions: persona.suggestions,
    uiConfig: persona.uiConfig
  });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  console.log('📨 Chat request received:', req.body.personaId, req.body.message?.slice(0, 50));
  
  try {
    const { personaId, message, history = [] } = req.body;
    
    const persona = getPersona(personaId);
    if (!persona) {
      return res.status(400).json({ error: 'Invalid persona' });
    }

    const messages = [
      { role: 'system', content: persona.systemPrompt },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 350,
    });

    const reply = completion.choices[0].message.content;
    console.log('✅ Response sent, length:', reply.length);
    res.json({ reply });
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    res.status(500).json({ 
      error: 'AI service is currently busy. Please try again.',
      details: error.message
    });
  }
});

// Get all personas
app.get('/api/personas', (req, res) => {
  const personaList = Object.values(PERSONAS).map(p => ({
    id: p.id,
    name: p.name,
    title: p.title,
    uiConfig: p.uiConfig,
    suggestions: p.suggestions
  }));
  res.json(personaList);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📝 Available personas: ${Object.keys(PERSONAS).join(', ')}`);
  console.log(`✅ CORS enabled for http://localhost:5173`);
});

// Serve frontend files in production
const path = require('path');

// Serve static files from frontend dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle all other routes - send to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

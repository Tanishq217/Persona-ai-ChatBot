require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

// Import persona registry
const { PERSONAS, getPersona } = require('./personas');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    personas: Object.keys(PERSONAS),
    timestamp: new Date().toISOString()
  });
});

// Get persona details endpoint (for frontend to fetch suggestions dynamically)
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
  try {
    const { personaId, message, history = [] } = req.body;
    
    // Get persona from registry
    const persona = getPersona(personaId);
    
    if (!persona) {
      return res.status(400).json({ error: 'Invalid persona. Available: ' + Object.keys(PERSONAS).join(', ') });
    }

    // Build conversation history with persona's system prompt
    const messages = [
      { role: 'system', content: persona.systemPrompt },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log(`[${persona.name}] Processing: "${message.slice(0, 50)}..."`);

    // Call LLM API
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama3-70b-8192', // Using Llama 3 70B for best quality
      temperature: 0.7,
      max_tokens: 350,
    });

    const reply = completion.choices[0].message.content;
    
    console.log(`[${persona.name}] Response sent (${reply.length} chars)`);
    res.json({ reply });
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Graceful error handling
    res.status(500).json({ 
      error: 'AI service is currently busy. Please try again in a moment.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all personas list (for frontend to build UI dynamically)
app.get('/api/personas', (req, res) => {
  const personaList = Object.values(PERSONAS).map(p => ({
    id: p.id,
    name: p.name,
    title: p.title,
    uiConfig: p.uiConfig
  }));
  res.json(personaList);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📝 Available personas: ${Object.keys(PERSONAS).join(', ')}`);
});
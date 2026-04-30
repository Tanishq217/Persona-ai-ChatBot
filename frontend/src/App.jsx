import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Loader2, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman');
  const [personas, setPersonas] = useState({});
  const [currentPersona, setCurrentPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch personas from backend on mount
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/personas`);
        const personasList = response.data;
        
        // Convert array to object for easy lookup
        const personasMap = {};
        personasList.forEach(p => {
          personasMap[p.id] = p;
        });
        setPersonas(personasMap);
        
        // Set first persona as active if none selected
        if (personasList.length > 0 && !currentPersona) {
          setActivePersonaId(personasList[0].id);
          setCurrentPersona(personasList[0]);
        }
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      }
    };
    
    fetchPersonas();
  }, []);

  // Fetch specific persona details when activePersonaId changes
  useEffect(() => {
    const fetchPersonaDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/personas/${activePersonaId}`);
        setCurrentPersona(response.data);
      } catch (error) {
        console.error('Failed to fetch persona details:', error);
      }
    };
    
    if (activePersonaId) {
      fetchPersonaDetails();
    }
  }, [activePersonaId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePersonaSwitch = (personaId) => {
    setActivePersonaId(personaId);
    setMessages([]);
    setInput('');
  };

  const sendMessage = async (userMessage = input) => {
    if (!userMessage.trim() || isLoading) return;
    
    const messageText = userMessage;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await axios.post(`${API_URL}/api/chat`, {
        personaId: activePersonaId,
        message: messageText,
        history
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.reply 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Sorry, I\'m having trouble connecting. Please check your network or try again later.',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPersona) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎯 Scaler Persona AI
          </h1>
          <p className="text-sm text-gray-600 mt-1">Chat with Scaler's co-founders & lead instructor</p>
        </div>
      </div>

      {/* Persona Switcher */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.values(personas).map((persona) => (
            <button
              key={persona.id}
              onClick={() => handlePersonaSwitch(persona.id)}
              className={`relative group p-4 rounded-2xl transition-all duration-300 ${
                activePersonaId === persona.id
                  ? `bg-gradient-to-r ${persona.uiConfig.color} shadow-lg scale-105 text-white`
                  : 'bg-white hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{persona.uiConfig.avatar}</span>
                <div className="text-left">
                  <div className="font-semibold">{persona.name}</div>
                  <div className={`text-xs ${activePersonaId === persona.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {persona.title}
                  </div>
                </div>
              </div>
              {activePersonaId === persona.id && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                  Active
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        {/* Greeting / Suggestions */}
        {messages.length === 0 && currentPersona.greeting && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <p className="text-gray-700 italic">{currentPersona.uiConfig?.greeting || currentPersona.greeting}</p>
          </div>
        )}
        
        {messages.length === 0 && currentPersona.suggestions && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Quick questions for {currentPersona.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {currentPersona.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(suggestion)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-gray-700' : `bg-gradient-to-r ${currentPersona.uiConfig.color}`
                } text-white text-sm`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : currentPersona.uiConfig.avatar}
                </div>
                <div className={`p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                    : msg.isError 
                      ? 'bg-red-50 border border-red-200 text-red-700'
                      : 'bg-white shadow-sm border border-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${currentPersona.uiConfig.color} text-white`}>
                  {currentPersona.uiConfig.avatar}
                </div>
                <div className="p-3 bg-white shadow-sm rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${currentPersona.name} anything...`}
            className="flex-1 px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
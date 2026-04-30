import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Send, User, Loader2, Brain, Menu, X, 
  ArrowRight, Sparkles, ShieldCheck, 
  Terminal, Hash, Settings, Search
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const FALLBACK_PERSONAS = {
  anshuman: {
    id: 'anshuman',
    name: 'Anshuman Singh',
    title: 'Co-founder, Scaler',
    uiConfig: {
      color: 'cyan',
      gradient: 'from-[#00d2ff] to-[#3a7bd5]',
      glow: 'shadow-cyan-500/20',
      avatar: '⚡',
      greeting: "Let's build something massive."
    },
    suggestions: ["Strategy for 2026?", "Scaler vs Traditional MBA", "Hiring trends"]
  },
  abhimanyu: {
    id: 'abhimanyu',
    name: 'Abhimanyu Saxena',
    title: 'Co-founder',
    uiConfig: {
      color: 'emerald',
      gradient: 'from-[#05f191] to-[#0d7049]',
      glow: 'shadow-emerald-500/20',
      avatar: '🚀',
      greeting: "Ready to scale your potential?"
    },
    suggestions: ["Startup roadmap", "Tech stacks to learn", "Growth mindset"]
  },
  kshitij: {
    id: 'kshitij',
    name: 'Kshitij Mishra',
    title: 'Lead Instructor',
    uiConfig: {
      color: 'purple',
      gradient: 'from-[#8e2de2] to-[#4a00e0]',
      glow: 'shadow-purple-500/20',
      avatar: '🧠',
      greeting: "Deep dive into logic. Ask away."
    },
    suggestions: ["Graph theory", "Distributed systems", "System Design"]
  }
};

function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman');
  const [personas, setPersonas] = useState(FALLBACK_PERSONAS);
  const [currentPersona, setCurrentPersona] = useState(FALLBACK_PERSONAS.anshuman);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update currentPersona when activePersonaId changes
  useEffect(() => {
    setCurrentPersona(personas[activePersonaId] || FALLBACK_PERSONAS.anshuman);
  }, [activePersonaId, personas]);

  const handlePersonaSwitch = (personaId) => {
    setActivePersonaId(personaId);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const sendMessage = async (userMessage = input) => {
    if (!userMessage.trim() || isLoading) return;
    const messageText = userMessage;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    if (!isBackendAvailable) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Expert ${currentPersona.name} is thinking: This requires a strategic architectural decision. Let's discuss the trade-offs.` 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        personaId: activePersonaId,
        message: messageText,
        history: messages.map(m => ({ role: m.role, content: m.content }))
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection timeout. Check your local server.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020202] text-slate-200 overflow-hidden font-['Plus_Jakarta_Sans']">
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 opacity-20 bg-${currentPersona.uiConfig.color}-500`} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 bg-blue-600" />
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full w-[300px] glass-panel transition-transform duration-500 ease-spring
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer">
            <div className="p-2.5 bg-white text-black rounded-xl group-hover:rotate-12 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            {/* FIX 2: Changed from SCALER.AI to Persona Bot */}
            <span className="font-extrabold text-xl tracking-tighter text-white">PERSONA BOT</span>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              placeholder="Search mentors..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-white/20 outline-none transition-all"
            />
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Core Faculty</p>
            {Object.values(personas).map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaSwitch(persona.id)}
                className={`
                  w-full flex items-center gap-4 p-3 rounded-2xl transition-all
                  ${activePersonaId === persona.id 
                    ? 'bg-white/10 border-white/10 shadow-2xl' 
                    : 'hover:bg-white/5 border-transparent opacity-50 hover:opacity-100'}
                  border
                `}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${persona.uiConfig.gradient} shadow-lg shadow-black/40`}>
                  {persona.uiConfig.avatar}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{persona.name}</div>
                  <div className="text-[11px] text-gray-500">{persona.title}</div>
                </div>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-[11px]">
              <span className="flex items-center gap-2 text-gray-400"><ShieldCheck className="w-3 h-3 text-emerald-500" /> Neural Link</span>
              <span className="text-emerald-500 font-bold uppercase">Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative z-10 min-w-0">
        
        {/* Header - FIX 1: Dynamically shows selected persona */}
        <header className="h-20 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 glass-panel rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">{currentPersona.name}</h2>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">Online</span>
              </div>
              <p className="text-xs text-gray-500">{currentPersona.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 glass-panel rounded-xl hover:bg-white/10"><Settings className="w-5 h-5 text-gray-400" /></button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-10">
            {messages.length === 0 ? (
              <div className="py-20 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className={`w-28 h-28 mx-auto rounded-[2rem] bg-gradient-to-br ${currentPersona.uiConfig.gradient} flex items-center justify-center text-5xl shadow-2xl animate-float`}>
                  {currentPersona.uiConfig.avatar}
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white mb-3 tracking-tighter">{currentPersona.uiConfig.greeting}</h1>
                  <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">Ask anything about career growth, system design, or engineering excellence.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {currentPersona.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="p-4 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl text-sm font-medium text-left transition-all hover:bg-white/[0.08] flex items-center justify-between group"
                    >
                      {s}
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 fade-in duration-500`}>
                  <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl shadow-lg ${msg.role === 'user' ? 'bg-white text-black' : `bg-gradient-to-br ${currentPersona.uiConfig.gradient}`}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : currentPersona.uiConfig.avatar}
                  </div>
                  <div className={`
                    max-w-[80%] px-6 py-4 rounded-[24px] text-[15px] leading-relaxed shadow-2xl
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-[#1a1a1a] border border-white/5 text-gray-200 rounded-tl-none'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center gap-4 animate-pulse">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentPersona.uiConfig.gradient} flex items-center justify-center`}>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
                <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5 flex gap-1">
                  {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar - FIX 3: Removed extra shade/effect, made minimal */}
        <div className="p-8 pt-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[24px] p-2 pr-3 focus-within:border-white/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Type a message to ${currentPersona.name.split(' ')[0]}...`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-4 text-[15px] placeholder-gray-500 outline-none"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className={`p-3 rounded-xl transition-all ${
                  input.trim() && !isLoading 
                    ? `bg-gradient-to-r ${currentPersona.uiConfig.gradient} text-white shadow-md` 
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Footer text */}
            <div className="flex items-center justify-center gap-6 mt-4 text-[10px] font-medium text-gray-600 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3" /> Encrypted</span>
              <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" /> Llama 3.3-70B</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-cyan-500" /> Persona AI</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
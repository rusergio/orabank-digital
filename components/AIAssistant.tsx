
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { User, Transaction, GeminiMessage } from '../types';
import { getFinancialAdvice } from '../services/gemini';

interface AIAssistantProps {
  user: User;
  transactions: Transaction[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ user, transactions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<GeminiMessage[]>([
    { role: 'model', text: `Olá ${user.name.split(' ')[0]}, sou o OraAssistant. Como posso ajudar com suas finanças hoje?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const aiResponse = await getFinancialAdvice(user, transactions, userMessage);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 ${
          isExpanded ? 'w-[90vw] h-[80vh] md:w-[600px] md:h-[600px]' : 'w-[90vw] h-[60vh] md:w-[400px] md:h-[500px]'
        }`}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl text-white" style={{ backgroundColor: '#014C2E' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">OraAssistant</h4>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-emerald-100">Inteligência Artificial</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/10 rounded-lg">
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-50 transition-all">
              <input
                type="text"
                placeholder="Pergunte sobre seus gastos..."
                className="flex-1 bg-transparent border-none outline-none px-3 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:bg-gray-400 transition-colors"
                style={{ backgroundColor: '#014C2E' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#013a24')}
                onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#014C2E')}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 px-1">
               <Sparkles size={12} style={{ color: '#014C2E' }} />
               <p className="text-[10px] text-slate-400">Poderá analisar extratos ou sugerir poupanças.</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          style={{ backgroundColor: '#014C2E' }}
        >
          <Bot size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;

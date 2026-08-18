import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Terminal, Sparkles, User, HelpCircle } from 'lucide-react';
import { getAiResponse } from '../../data/aiResponses';

export default function AiAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Reuben's AI Portfolio Assistant. Ask me anything about his full-stack projects, AI/ML models, BCA Game Dev background, or tech stack!"
    }
  ]);

  const quickPrompts = [
    "What projects has Reuben built?",
    "What technologies does he use?",
    "What is his educational background?",
    "What game-development experience does he have?",
    "Does he have UI/UX experience?"
  ];

  const handleSend = (userText) => {
    const textToSend = userText || query;
    if (!textToSend.trim()) return;

    const newMessages = [
      ...messages,
      { sender: 'user', text: textToSend },
      { sender: 'ai', text: getAiResponse(textToSend) }
    ];

    setMessages(newMessages);
    setQuery('');
  };

  return (
    <section id="ai-assistant" className="py-24 px-6 md:px-12 bg-[#09090b] relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10 font-mono">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs tracking-widest uppercase rounded-sm">
            <Bot size={14} />
            <span>PORTFOLIO ASSISTANT</span>
          </div>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            ASK REUBEN
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Interactive AI Assistant grounded strictly in Reuben Binu George's verified CV, education, and portfolio data.
          </p>
        </div>

        {/* Terminal Chat Box */}
        <div className="bg-[#0f0f13] border border-white/15 rounded-sm overflow-hidden shadow-2xl">
          
          {/* Top Terminal Bar */}
          <div className="bg-[#050507] border-b border-white/10 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span className="ml-2 text-white font-bold">ASK_REUBEN_AI.SH</span>
            </div>
            <span className="text-[#ccff00]">ONLINE // CV DATASET</span>
          </div>

          {/* Messages Area */}
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto font-sans text-sm">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-sm bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`p-4 rounded-sm max-w-lg leading-relaxed whitespace-pre-line font-mono text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'bg-[#050507] border border-white/10 text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-sm bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0">
                    <User size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Quick Prompts Pills */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#050507]/50 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1 font-mono text-[10px]">
              <HelpCircle size={12} /> PROMPTS:
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="bg-white/5 hover:bg-[#ccff00]/20 hover:text-[#ccff00] border border-white/10 text-slate-300 px-2.5 py-1 rounded-sm transition-all text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-white/10 bg-[#050507] flex items-center gap-3"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about Reuben's background..."
              className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="bg-[#ccff00] text-black font-bold px-4 py-2 rounded-sm hover:bg-[#b8ff00] transition-colors flex items-center gap-1 text-xs"
            >
              <span>SEND</span>
              <Send size={14} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

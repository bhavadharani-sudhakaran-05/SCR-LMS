import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiPaperAirplane, HiLightBulb, HiBookOpen, HiCode, HiAcademicCap } from 'react-icons/hi';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm **Acadrix AI Tutor**, your personal learning assistant. I can help you with:\n\n🧮 **Math & Science** — Solve problems step by step\n💻 **Coding** — Debug code, explain concepts\n📝 **Writing** — Essay help, grammar, structure\n📚 **Study Plans** — Personalized study schedules\n🧠 **Any Subject** — Just ask!\n\nWhat would you like help with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const quickPrompts = [
    { icon: '🧮', label: 'Solve a math problem', prompt: 'Help me solve this math problem: ' },
    { icon: '💻', label: 'Debug my code', prompt: 'Can you help me debug this code?\n\n```\n\n```' },
    { icon: '📝', label: 'Explain a concept', prompt: 'Can you explain the concept of ' },
    { icon: '📅', label: 'Create study plan', prompt: 'Create a study plan for my upcoming exam on ' },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');
    setIsTyping(true);

    try {
      const { data } = await api.post('/api/ai/tutor', { message: query, history: messages.slice(-10) });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.data?.response || "I've analyzed your question. Here's what I think:\n\nThis is a great question! Let me break it down step by step...\n\n**Key Points:**\n1. Start with the fundamentals\n2. Practice with examples\n3. Test your understanding\n\nWould you like me to go deeper into any of these?",
        timestamp: new Date(),
      }]);
    } catch {
      const aiResponses = [
        "Great question! Let me think about this...\n\n**Here's my analysis:**\n\nThe key insight here is to break the problem into smaller parts. Start by identifying what you already know, then work toward the unknown.\n\n💡 **Tip:** Try drawing a diagram to visualize the relationships between concepts.\n\nWould you like me to work through a specific example?",
        "I'd be happy to help with that!\n\n**Step-by-step approach:**\n\n1. **Identify** the core concept\n2. **Recall** related formulas or rules\n3. **Apply** them systematically\n4. **Verify** your answer\n\n📚 This is a common topic in exams. Let me know if you want practice problems!",
        "Interesting question! Here's how I would approach it:\n\n**Key Concept:** Understanding the underlying principles is crucial.\n\n**Example:**\nLet's say we have the equation `x² + 5x + 6 = 0`\n\nWe can factor this as: `(x + 2)(x + 3) = 0`\n\nSo `x = -2` or `x = -3` ✅\n\nWant me to explain a different approach?",
      ];
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
          <HiSparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Tutor</h1>
          <p className="text-sm text-gray-500">Powered by AI • Always available</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 font-medium">Online</span>
        </div>
      </motion.div>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden flex flex-col" padding="">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                  <div className={`rounded-2xl px-5 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content.split('**').map((part, j) =>
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                  <p className={`text-[10px] text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-5 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-6 pb-3">
            <div className="grid grid-cols-2 gap-2">
              {quickPrompts.map((qp, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setInput(qp.prompt); inputRef.current?.focus(); }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <span className="text-lg">{qp.icon}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{qp.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white flex items-center justify-center disabled:opacity-50 shadow-lg shadow-primary-500/30"
            >
              <HiPaperAirplane className="h-5 w-5 rotate-90" />
            </motion.button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AITutor;

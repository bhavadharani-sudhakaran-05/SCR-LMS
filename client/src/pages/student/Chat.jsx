import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiPaperAirplane, HiUserGroup, HiSearch, HiDotsVertical } from 'react-icons/hi';
import Card from '../../components/ui/Card';

const channels = [
  { id: 'general', name: 'General', icon: '💬', lastMsg: 'Anyone free for a study session?', unread: 3 },
  { id: 'math', name: 'Mathematics', icon: '🧮', lastMsg: 'Can someone explain integration?', unread: 1 },
  { id: 'cs', name: 'CS Discussion', icon: '💻', lastMsg: 'Check out this React tutorial!', unread: 0 },
  { id: 'physics', name: 'Physics Help', icon: '⚛️', lastMsg: 'Newton\'s 3rd law question', unread: 5 },
  { id: 'study', name: 'Study Group', icon: '📚', lastMsg: 'Meeting at 4pm today', unread: 0 },
];

const mockMessages = [
  { id: 1, user: 'Alex R.', avatar: '🧑', content: 'Hey everyone! Ready for the calculus exam?', time: '10:32 AM', isOwn: false },
  { id: 2, user: 'Sarah K.', avatar: '👩', content: 'I\'m still struggling with integration by parts 😅', time: '10:33 AM', isOwn: false },
  { id: 3, user: 'You', avatar: '😊', content: 'I can help! The trick is to use the LIATE rule for choosing u and dv.', time: '10:34 AM', isOwn: true },
  { id: 4, user: 'Mike T.', avatar: '👨', content: 'That\'s a great tip! Can you share your notes?', time: '10:35 AM', isOwn: false },
  { id: 5, user: 'You', avatar: '😊', content: 'Sure! I\'ll upload them to the resources section after class.', time: '10:36 AM', isOwn: true },
  { id: 6, user: 'Emma W.', avatar: '👧', content: 'Thanks! You\'re the best 🙌', time: '10:37 AM', isOwn: false },
  { id: 7, user: 'Alex R.', avatar: '🧑', content: 'Also, don\'t forget about the study session tomorrow at 4pm in the library!', time: '10:38 AM', isOwn: false },
];

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      user: 'You',
      avatar: '😊',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Channels Sidebar */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-72 shrink-0">
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HiChat className="text-primary-500" /> Channels
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {channels.map(ch => (
              <motion.button
                key={ch.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeChannel === ch.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{ch.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{ch.name}</p>
                  <p className="text-xs text-gray-500 truncate">{ch.lastMsg}</p>
                </div>
                {ch.unread > 0 && (
                  <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                    {ch.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Chat Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
        <Card className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{channels.find(c => c.id === activeChannel)?.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{channels.find(c => c.id === activeChannel)?.name}</h3>
                <p className="text-xs text-gray-500">12 members • 5 online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiSearch className="h-5 w-5 text-gray-400" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiUserGroup className="h-5 w-5 text-gray-400" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm shrink-0">
                    {msg.avatar}
                  </div>
                  <div>
                    <div className={`flex items-center gap-2 mb-1 ${msg.isOwn ? 'justify-end' : ''}`}>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{msg.user}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                      msg.isOwn
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSend}
                className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white flex items-center justify-center shadow-lg">
                <HiPaperAirplane className="h-5 w-5 rotate-90" />
              </motion.button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Chat;

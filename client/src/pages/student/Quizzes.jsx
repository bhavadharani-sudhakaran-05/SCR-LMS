import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiClipboardCheck, HiClock, HiCheckCircle, HiExclamationCircle, HiEye, HiUpload } from 'react-icons/hi';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [tab, setTab] = useState('upcoming');

  useEffect(() => {
    setQuizzes([
      { _id: '1', title: 'Calculus Midterm Quiz', course: 'Advanced Mathematics', dueDate: new Date(Date.now() + 172800000).toISOString(), duration: 45, questions: 25, type: 'mcq', status: 'upcoming', maxScore: 100 },
      { _id: '2', title: 'Physics Ch.7 Test', course: 'Physics Fundamentals', dueDate: new Date(Date.now() + 86400000).toISOString(), duration: 30, questions: 20, type: 'mixed', status: 'upcoming', maxScore: 80 },
      { _id: '3', title: 'Data Structures Quiz', course: 'Computer Science 101', dueDate: new Date(Date.now() - 86400000).toISOString(), duration: 60, questions: 30, type: 'coding', status: 'completed', score: 92, maxScore: 100 },
      { _id: '4', title: 'English Grammar Test', course: 'English Literature', dueDate: new Date(Date.now() - 259200000).toISOString(), duration: 30, questions: 40, type: 'mcq', status: 'completed', score: 78, maxScore: 100 },
      { _id: '5', title: 'Physics Ch.5 Quiz', course: 'Physics Fundamentals', dueDate: new Date(Date.now() - 432000000).toISOString(), duration: 20, questions: 15, type: 'mcq', status: 'completed', score: 88, maxScore: 100 },
    ]);
  }, []);

  const filtered = quizzes.filter(q => q.status === tab);
  const colors = { mcq: 'from-blue-500 to-indigo-600', mixed: 'from-emerald-500 to-teal-600', coding: 'from-violet-500 to-purple-600' };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes & Tests</h1>
        <p className="text-gray-500 mt-1">Test your knowledge and earn XP</p>
      </motion.div>

      <div className="flex gap-2">
        {['upcoming', 'completed'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((quiz, i) => {
            const daysLeft = Math.ceil((new Date(quiz.dueDate) - new Date()) / 86400000);
            return (
              <motion.div key={quiz._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }}>
                <Card className="overflow-hidden h-full" padding="">
                  <div className={`h-2 bg-gradient-to-r ${colors[quiz.type] || colors.mcq}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 uppercase">{quiz.type}</span>
                      {quiz.status === 'upcoming' && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${daysLeft <= 1 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          {daysLeft <= 0 ? 'Today!' : `${daysLeft}d left`}
                        </span>
                      )}
                      {quiz.status === 'completed' && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${quiz.score >= 90 ? 'bg-emerald-100 text-emerald-600' : quiz.score >= 70 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                          {quiz.score}/{quiz.maxScore}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{quiz.course}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><HiClock className="h-3.5 w-3.5" /> {quiz.duration} min</span>
                      <span className="flex items-center gap-1"><HiClipboardCheck className="h-3.5 w-3.5" /> {quiz.questions} Qs</span>
                    </div>
                    {quiz.status === 'upcoming' ? (
                      <Button variant="primary" size="sm" className="w-full">Start Quiz</Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" icon={HiEye}>Review Answers</Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quizzes;

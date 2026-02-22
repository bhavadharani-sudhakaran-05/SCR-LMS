import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDocumentText, HiClock, HiCheckCircle, HiUpload, HiExclamationCircle, HiEye } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [tab, setTab] = useState('pending');

  useEffect(() => {
    setAssignments([
      { _id: '1', title: 'Calculus Problem Set #5', course: 'Advanced Mathematics', dueDate: new Date(Date.now() + 86400000).toISOString(), status: 'pending', maxScore: 100, description: 'Solve problems 1-20 from Chapter 5.', type: 'problem-set' },
      { _id: '2', title: 'Newton\'s Laws Lab Report', course: 'Physics Fundamentals', dueDate: new Date(Date.now() + 259200000).toISOString(), status: 'pending', maxScore: 50, description: 'Write a detailed lab report on the Newton\'s Laws experiment.', type: 'report' },
      { _id: '3', title: 'React Portfolio Project', course: 'Computer Science 101', dueDate: new Date(Date.now() + 604800000).toISOString(), status: 'pending', maxScore: 200, description: 'Build a portfolio website using React.js.', type: 'project' },
      { _id: '4', title: 'Shakespeare Essay', course: 'English Literature', dueDate: new Date(Date.now() - 86400000).toISOString(), status: 'submitted', score: 88, maxScore: 100, feedback: 'Excellent analysis! Good use of quotes.', type: 'essay' },
      { _id: '5', title: 'Linear Algebra HW #3', course: 'Advanced Mathematics', dueDate: new Date(Date.now() - 259200000).toISOString(), status: 'graded', score: 95, maxScore: 100, feedback: 'Perfect work on eigenvalues section!', type: 'problem-set' },
      { _id: '6', title: 'Binary Trees Implementation', course: 'Computer Science 101', dueDate: new Date(Date.now() - 432000000).toISOString(), status: 'graded', score: 92, maxScore: 100, feedback: 'Clean code, well documented.', type: 'coding' },
    ]);
  }, []);

  const filtered = tab === 'pending'
    ? assignments.filter(a => a.status === 'pending')
    : assignments.filter(a => a.status === 'submitted' || a.status === 'graded');

  const typeColors = { 'problem-set': 'from-blue-500 to-indigo-600', report: 'from-emerald-500 to-teal-600', project: 'from-violet-500 to-purple-600', essay: 'from-pink-500 to-rose-600', coding: 'from-cyan-500 to-blue-600' };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
        <p className="text-gray-500 mt-1">Track assignments and submit your work</p>
      </motion.div>

      <div className="flex gap-2">
        {['pending', 'completed'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {t} ({t === 'pending' ? assignments.filter(a => a.status === 'pending').length : assignments.filter(a => a.status !== 'pending').length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((assignment, i) => {
            const daysLeft = Math.ceil((new Date(assignment.dueDate) - new Date()) / 86400000);
            return (
              <motion.div key={assignment._id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }}>
                <Card className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${typeColors[assignment.type] || typeColors['problem-set']} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                      <HiDocumentText className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{assignment.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {assignment.status === 'pending' && (
                        <>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${daysLeft <= 1 ? 'bg-red-100 text-red-600' : daysLeft <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                            {daysLeft <= 0 ? 'Overdue!' : `${daysLeft}d left`}
                          </span>
                          <div className="mt-2">
                            <Button variant="primary" size="xs" icon={HiUpload}>Submit</Button>
                          </div>
                        </>
                      )}
                      {assignment.status === 'submitted' && (
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium flex items-center gap-1">
                          <HiClock className="h-3.5 w-3.5" /> Submitted
                        </span>
                      )}
                      {assignment.status === 'graded' && (
                        <div>
                          <span className={`text-lg font-bold ${assignment.score >= 90 ? 'text-emerald-600' : assignment.score >= 70 ? 'text-blue-600' : 'text-red-600'}`}>
                            {assignment.score}/{assignment.maxScore}
                          </span>
                          <p className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{assignment.feedback}</p>
                        </div>
                      )}
                    </div>
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

export default Assignments;

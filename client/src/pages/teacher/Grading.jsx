import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiClipboardCheck, HiStar, HiCheckCircle, HiEye, HiSparkles } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const submissions = [
  { _id: '1', student: 'Alex Robinson', assignment: 'Calculus Problem Set #5', course: 'Advanced Mathematics', submittedAt: new Date(Date.now() - 3600000).toISOString(), status: 'pending', content: 'Problem 1: Using the chain rule...\nProblem 2: Integration by substitution...' },
  { _id: '2', student: 'Sarah Kim', assignment: 'Physics Lab Report', course: 'Physics Fundamentals', submittedAt: new Date(Date.now() - 7200000).toISOString(), status: 'pending', content: 'Lab Report: Newton\'s Laws Experiment...' },
  { _id: '3', student: 'Emma Wilson', assignment: 'Shakespeare Essay', course: 'English Literature', submittedAt: new Date(Date.now() - 10800000).toISOString(), status: 'pending', content: 'The Tragedy of Hamlet, Prince of Denmark...' },
  { _id: '4', student: 'Mike Torres', assignment: 'React Project Phase 2', course: 'CS 101', submittedAt: new Date(Date.now() - 14400000).toISOString(), status: 'graded', score: 92, content: 'React Portfolio Project submission...' },
  { _id: '5', student: 'Daniel Harris', assignment: 'Binary Trees Implementation', course: 'CS 101', submittedAt: new Date(Date.now() - 18000000).toISOString(), status: 'graded', score: 88, content: 'Binary tree implementation in JavaScript...' },
];

const Grading = () => {
  const [tab, setTab] = useState('pending');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const filtered = submissions.filter(s => s.status === tab);

  const handleGrade = () => {
    // Submit grade logic
    setSelectedSubmission(null);
    setGradeInput('');
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiClipboardCheck className="text-primary-500" /> Grading Center
        </h1>
        <p className="text-gray-500 mt-1">Review and grade student submissions</p>
      </motion.div>

      <div className="flex gap-2">
        {['pending', 'graded'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {t} ({submissions.filter(s => s.status === t).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((sub, i) => (
          <motion.div key={sub._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }}>
            <Card className="p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  {sub.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white">{sub.assignment}</h3>
                  <p className="text-sm text-gray-500">{sub.student} • {sub.course}</p>
                  <p className="text-xs text-gray-400">Submitted {new Date(sub.submittedAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  {sub.status === 'graded' && (
                    <span className="text-lg font-bold text-emerald-600">{sub.score}/100</span>
                  )}
                  <Button variant={sub.status === 'pending' ? 'primary' : 'outline'} size="sm"
                    icon={sub.status === 'pending' ? HiStar : HiEye}
                    onClick={() => setSelectedSubmission(sub)}>
                    {sub.status === 'pending' ? 'Grade' : 'View'}
                  </Button>
                  {sub.status === 'pending' && (
                    <Button variant="ghost" size="sm" icon={HiSparkles} className="text-violet-500">
                      AI Grade
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grading Modal */}
      <Modal isOpen={!!selectedSubmission} onClose={() => setSelectedSubmission(null)} title={`Grade: ${selectedSubmission?.assignment}`} size="lg">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Student: {selectedSubmission?.student}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{selectedSubmission?.content}</div>
          </div>
          {selectedSubmission?.status === 'pending' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Score (0-100)</label>
                <input type="number" min={0} max={100} value={gradeInput} onChange={e => setGradeInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Feedback</label>
                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={3}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Provide feedback for the student..." />
              </div>
              <div className="flex gap-3">
                <Button variant="primary" icon={HiCheckCircle} onClick={handleGrade}>Submit Grade</Button>
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Grading;

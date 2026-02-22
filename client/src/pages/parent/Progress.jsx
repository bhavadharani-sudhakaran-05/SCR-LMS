import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiTrendingUp, HiClock, HiStar, HiCalendar, HiChevronDown } from 'react-icons/hi';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import api from '../../utils/api';

const fallbackChildren = [
  { _id: '1', name: 'Alex Robinson', grade: 'A', attendance: 96 },
  { _id: '2', name: 'Emma Robinson', grade: 'B+', attendance: 91 },
];

const fallbackGrades = [
  { month: 'Jan', grade: 78 }, { month: 'Feb', grade: 82 }, { month: 'Mar', grade: 85 },
  { month: 'Apr', grade: 80 }, { month: 'May', grade: 88 }, { month: 'Jun', grade: 92 },
];

const fallbackCourses = [
  { name: 'Machine Learning', grade: 92, progress: 85, teacher: 'Dr. Smith', status: 'On Track' },
  { name: 'Web Development', grade: 88, progress: 72, teacher: 'Prof. Chen', status: 'On Track' },
  { name: 'Data Structures', grade: 76, progress: 60, teacher: 'Dr. Smith', status: 'Needs Attention' },
  { name: 'Databases', grade: 90, progress: 95, teacher: 'Prof. Chen', status: 'Excellent' },
];

const fallbackSubjects = [
  { subject: 'Math', score: 85 }, { subject: 'Science', score: 90 }, { subject: 'English', score: 72 },
  { subject: 'History', score: 65 }, { subject: 'CS', score: 95 }, { subject: 'Art', score: 78 },
];

const fallbackActivity = [
  { day: 'Mon', hours: 3.5 }, { day: 'Tue', hours: 4.2 }, { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 5.0 }, { day: 'Fri', hours: 3.1 }, { day: 'Sat', hours: 1.5 }, { day: 'Sun', hours: 2.0 },
];

const fallbackAssignments = [
  { title: 'Neural Network Project', course: 'Machine Learning', due: '2024-04-02', status: 'pending' },
  { title: 'React Portfolio', course: 'Web Development', due: '2024-04-05', status: 'submitted' },
  { title: 'Binary Tree Quiz', course: 'Data Structures', due: '2024-04-08', status: 'pending' },
];

const Progress = () => {
  const [children] = useState(fallbackChildren);
  const [selectedChild, setSelectedChild] = useState(0);
  const [grades] = useState(fallbackGrades);
  const [courses] = useState(fallbackCourses);
  const [subjects] = useState(fallbackSubjects);
  const [activity] = useState(fallbackActivity);
  const [assignments] = useState(fallbackAssignments);
  const child = children[selectedChild];

  const statusColor = {
    'On Track': 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    'Needs Attention': 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    'Excellent': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Academic Progress</h1>
          <p className="text-gray-500 mt-1">Detailed performance tracking</p>
        </div>
        <div className="relative">
          <select value={selectedChild} onChange={e => setSelectedChild(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
            {children.map((c, i) => <option key={c._id} value={i}>{c.name}</option>)}
          </select>
          <HiChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Current GPA" value="3.6" icon={HiStar} color="blue" />
        <StatCard title="Attendance" value={child.attendance + '%'} icon={HiCalendar} color="green" />
        <StatCard title="Courses Active" value={courses.length} icon={HiAcademicCap} color="purple" />
        <StatCard title="Avg. Study Hours" value="3.2h" icon={HiClock} color="orange" />
      </div>

      {/* Grade Trend + Subject Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grade Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={grades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="grade" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#6366f1' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Strengths</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={subjects}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Course Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="w-14 h-14 flex-shrink-0">
                  <CircularProgressbar value={c.progress} text={`${c.progress}%`}
                    styles={buildStyles({ textSize: '26px', pathColor: c.progress > 80 ? '#10b981' : c.progress > 60 ? '#f59e0b' : '#ef4444', textColor: '#6b7280', trailColor: '#e5e7eb' })} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.teacher}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Grade: {c.grade}%</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Weekly Activity + Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Study Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Assignments</h3>
            <div className="space-y-3">
              {assignments.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.course} · Due {a.due}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${a.status === 'submitted' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiAcademicCap, HiTrendingUp, HiCalendar, HiCheckCircle,
  HiClock, HiBookOpen, HiEye, HiChartBar,
  HiHeart, HiStar, HiFire, HiExclamationCircle,
} from 'react-icons/hi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';

const ParentDashboard = () => {
  const { user } = useAuthStore();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/api/dashboard/parent');
        setDashData(data.data);
      } catch {
        setDashData({
          children: [
            {
              _id: '1',
              name: 'Alex Johnson',
              grade: 'Grade 10',
              avatar: null,
              overallGrade: 87,
              attendance: 94,
              enrolledCourses: 6,
              xpPoints: 4250,
              level: 9,
              streakDays: 15,
              mood: 'happy',
              courses: [
                { name: 'Mathematics', grade: 92, teacher: 'Dr. Smith', status: 'on-track' },
                { name: 'Physics', grade: 78, teacher: 'Prof. Johnson', status: 'needs-attention' },
                { name: 'Computer Science', grade: 95, teacher: 'Dr. Lee', status: 'excelling' },
                { name: 'English', grade: 84, teacher: 'Ms. Brown', status: 'on-track' },
              ],
              weeklyProgress: [
                { day: 'Mon', hours: 2.5, tasks: 3 },
                { day: 'Tue', hours: 3.1, tasks: 4 },
                { day: 'Wed', hours: 1.8, tasks: 2 },
                { day: 'Thu', hours: 4.2, tasks: 5 },
                { day: 'Fri', hours: 2.7, tasks: 3 },
                { day: 'Sat', hours: 5.0, tasks: 6 },
                { day: 'Sun', hours: 3.3, tasks: 4 },
              ],
              subjectStrengths: [
                { subject: 'Math', score: 92 },
                { subject: 'Science', score: 78 },
                { subject: 'English', score: 84 },
                { subject: 'CS', score: 95 },
                { subject: 'History', score: 80 },
                { subject: 'Art', score: 88 },
              ],
              upcomingDeadlines: [
                { title: 'Math Assignment #5', dueDate: new Date(Date.now() + 86400000).toISOString(), course: 'Mathematics' },
                { title: 'Physics Lab Report', dueDate: new Date(Date.now() + 172800000).toISOString(), course: 'Physics' },
                { title: 'CS Project', dueDate: new Date(Date.now() + 345600000).toISOString(), course: 'Computer Science' },
              ],
              recentAchievements: [
                { icon: '🏆', title: 'Quiz Master', date: '2 days ago' },
                { icon: '🔥', title: '15-Day Streak', date: '1 day ago' },
                { icon: '⚡', title: 'Speed Learner', date: 'Today' },
              ],
            },
            {
              _id: '2',
              name: 'Emma Johnson',
              grade: 'Grade 7',
              avatar: null,
              overallGrade: 91,
              attendance: 98,
              enrolledCourses: 5,
              xpPoints: 3200,
              level: 7,
              streakDays: 22,
              mood: 'excited',
              courses: [
                { name: 'Mathematics', grade: 94, teacher: 'Ms. Garcia', status: 'excelling' },
                { name: 'Science', grade: 88, teacher: 'Mr. Wilson', status: 'on-track' },
                { name: 'English', grade: 92, teacher: 'Ms. Taylor', status: 'excelling' },
                { name: 'Art', grade: 96, teacher: 'Ms. Rivera', status: 'excelling' },
              ],
              weeklyProgress: [
                { day: 'Mon', hours: 2.0, tasks: 4 },
                { day: 'Tue', hours: 2.5, tasks: 3 },
                { day: 'Wed', hours: 3.0, tasks: 5 },
                { day: 'Thu', hours: 2.8, tasks: 4 },
                { day: 'Fri', hours: 1.5, tasks: 2 },
                { day: 'Sat', hours: 3.5, tasks: 5 },
                { day: 'Sun', hours: 2.0, tasks: 3 },
              ],
              subjectStrengths: [
                { subject: 'Math', score: 94 },
                { subject: 'Science', score: 88 },
                { subject: 'English', score: 92 },
                { subject: 'Art', score: 96 },
                { subject: 'History', score: 85 },
                { subject: 'Music', score: 90 },
              ],
              upcomingDeadlines: [
                { title: 'Science Project', dueDate: new Date(Date.now() + 172800000).toISOString(), course: 'Science' },
                { title: 'Art Portfolio', dueDate: new Date(Date.now() + 432000000).toISOString(), course: 'Art' },
              ],
              recentAchievements: [
                { icon: '🌟', title: 'Perfect Score', date: '1 day ago' },
                { icon: '📚', title: 'Bookworm', date: '3 days ago' },
              ],
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const children = dashData?.children || [];
  const child = children[selectedChild];
  if (!child) return <p className="text-gray-500">No children linked to your account.</p>;

  const moodEmojis = { happy: '😊', excited: '🤩', neutral: '😐', sad: '😔', stressed: '😰' };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-600 p-8 text-white"
      >
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white/5"
              style={{ width: Math.random() * 100 + 50, height: Math.random() * 100 + 50, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity }} />
          ))}
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HiHeart className="text-pink-200" /> Parent Dashboard
          </h1>
          <p className="mt-2 text-white/80 text-lg">
            Welcome, {user?.name?.split(' ')[0] || 'Parent'}! Track your children's academic journey.
          </p>
        </div>
      </motion.div>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="flex gap-3">
          {children.map((c, i) => (
            <motion.button
              key={c._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedChild(i)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                i === selectedChild
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold">
                {c.name[0]}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                <p className="text-xs text-gray-500">{c.grade}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Child Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Grade" value={`${child.overallGrade}%`} icon={HiAcademicCap} color="blue" change={4.2} delay={0} />
        <StatCard title="Attendance" value={`${child.attendance}%`} icon={HiCheckCircle} color="green" change={1.5} delay={0.1} />
        <StatCard title="XP Points" value={child.xpPoints} icon={HiStar} color="amber" change={12.5} delay={0.2} />
        <StatCard title="Login Streak" value={`${child.streakDays}🔥`} icon={HiFire} color="red" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Study Hours</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={child.weeklyProgress}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="hours" stroke="#ec4899" strokeWidth={3} fill="url(#hoursGrad)" name="Hours" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Subject Strengths */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Subject Strengths</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={child.subjectStrengths}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={11} />
                <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Courses & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <HiBookOpen className="h-5 w-5 text-primary-500" /> Course Performance
            </h3>
            <div className="space-y-4">
              {child.courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="h-12 w-12 flex items-center justify-center">
                    <CircularProgressbar
                      value={course.grade}
                      text={`${course.grade}`}
                      styles={buildStyles({
                        textSize: '28px',
                        textColor: course.grade >= 90 ? '#10b981' : course.grade >= 70 ? '#f59e0b' : '#ef4444',
                        pathColor: course.grade >= 90 ? '#10b981' : course.grade >= 70 ? '#f59e0b' : '#ef4444',
                        trailColor: '#e5e7eb',
                      })}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{course.name}</p>
                    <p className="text-xs text-gray-500">{course.teacher}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    course.status === 'excelling' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    course.status === 'on-track' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {course.status === 'excelling' ? '⭐ Excelling' :
                     course.status === 'on-track' ? '✅ On Track' : '⚠️ Needs Attention'}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines + Achievements */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiCalendar className="h-5 w-5 text-red-500" /> Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {child.upcomingDeadlines.map((item, i) => {
                  const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / 86400000);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <HiClock className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.course}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        daysLeft <= 1 ? 'bg-red-100 text-red-600' : daysLeft <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {daysLeft}d left
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiStar className="h-5 w-5 text-amber-500" /> Recent Achievements
              </h3>
              <div className="space-y-3">
                {child.recentAchievements.map((ach, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{ach.title}</p>
                      <p className="text-xs text-gray-500">{ach.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

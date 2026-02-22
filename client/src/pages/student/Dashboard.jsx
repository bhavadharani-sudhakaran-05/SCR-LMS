import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiAcademicCap, HiBookOpen, HiLightningBolt, HiFire,
  HiClock, HiStar, HiTrendingUp, HiChartBar,
  HiPlay, HiCheckCircle, HiCalendar, HiSparkles,
} from 'react-icons/hi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const weeklyData = [
  { day: 'Mon', xp: 120, hours: 2.5 },
  { day: 'Tue', xp: 200, hours: 3.1 },
  { day: 'Wed', xp: 80, hours: 1.8 },
  { day: 'Thu', xp: 350, hours: 4.2 },
  { day: 'Fri', xp: 180, hours: 2.7 },
  { day: 'Sat', xp: 420, hours: 5.0 },
  { day: 'Sun', xp: 250, hours: 3.3 },
];

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/api/dashboard/student');
        setDashData(data.data);
      } catch {
        // Use fallback data
        setDashData({
          enrolledCourses: 6,
          completedCourses: 2,
          avgGrade: 87,
          upcomingAssignments: 3,
          totalXP: user?.xpPoints || 4250,
          streakDays: user?.streakCount || 15,
          level: user?.level || 9,
          recentCourses: [
            { _id: '1', title: 'Advanced Mathematics', progress: 72, thumbnail: null, instructor: { name: 'Dr. Smith' } },
            { _id: '2', title: 'Physics Fundamentals', progress: 45, thumbnail: null, instructor: { name: 'Prof. Johnson' } },
            { _id: '3', title: 'Computer Science 101', progress: 91, thumbnail: null, instructor: { name: 'Dr. Lee' } },
            { _id: '4', title: 'English Literature', progress: 33, thumbnail: null, instructor: { name: 'Ms. Brown' } },
          ],
          upcomingDeadlines: [
            { _id: '1', title: 'Math Assignment #5', dueDate: new Date(Date.now() + 86400000).toISOString(), course: 'Advanced Mathematics', type: 'assignment' },
            { _id: '2', title: 'Physics Quiz Ch.7', dueDate: new Date(Date.now() + 172800000).toISOString(), course: 'Physics Fundamentals', type: 'quiz' },
            { _id: '3', title: 'CS Project Submission', dueDate: new Date(Date.now() + 259200000).toISOString(), course: 'Computer Science 101', type: 'assignment' },
          ],
          recentBadges: [
            { name: 'Speed Learner', icon: '⚡', description: 'Completed 5 lessons in one day' },
            { name: 'Quiz Master', icon: '🏆', description: 'Scored 100% on 3 quizzes' },
            { name: 'Streak Champion', icon: '🔥', description: '15-day learning streak' },
          ],
          leaderboard: [
            { name: 'Alex R.', xp: 5200, avatar: null, rank: 1 },
            { name: user?.name || 'You', xp: user?.xpPoints || 4250, avatar: null, rank: 2, isYou: true },
            { name: 'Sarah K.', xp: 3900, avatar: null, rank: 3 },
            { name: 'Mike T.', xp: 3650, avatar: null, rank: 4 },
            { name: 'Emma W.', xp: 3400, avatar: null, rank: 5 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent"
        />
      </div>
    );
  }

  const d = dashData;
  const xpToNext = ((d.totalXP % 500) / 500) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 p-8 text-white"
      >
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 120 + 40,
                height: Math.random() * 120 + 40,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="mt-2 text-white/80 text-lg">
              {d.streakDays > 0
                ? `You're on a ${d.streakDays}-day streak! Keep it up! 🔥`
                : 'Start learning today to build your streak!'
              }
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-center">
              <div className="h-20 w-20">
                <CircularProgressbar
                  value={xpToNext}
                  text={`Lv ${d.level}`}
                  styles={buildStyles({
                    textColor: '#fff',
                    pathColor: '#fbbf24',
                    trailColor: 'rgba(255,255,255,0.2)',
                    textSize: '24px',
                  })}
                />
              </div>
              <p className="text-xs text-white/70 mt-1">{Math.round(xpToNext)}% to next</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <HiFire className="h-6 w-6 text-amber-400 mx-auto" />
              <p className="text-2xl font-bold">{d.streakDays}</p>
              <p className="text-xs text-white/70">Day Streak</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total XP"
          value={d.totalXP}
          icon={HiLightningBolt}
          color="amber"
          change={12.5}
          delay={0}
        />
        <StatCard
          title="Enrolled Courses"
          value={d.enrolledCourses}
          icon={HiBookOpen}
          color="blue"
          change={8}
          delay={0.1}
        />
        <StatCard
          title="Average Grade"
          value={`${d.avgGrade}%`}
          icon={HiTrendingUp}
          color="green"
          change={3.2}
          delay={0.2}
        />
        <StatCard
          title="Due Soon"
          value={d.upcomingAssignments}
          icon={HiClock}
          color="red"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* XP Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">XP Progress</h3>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiStar className="h-5 w-5 text-amber-500" />
                Leaderboard
              </h3>
              <Link to="/student/leaderboard" className="text-sm text-primary-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {d.leaderboard?.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    entry.isYou
                      ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`text-sm font-bold w-6 text-center ${
                    entry.rank === 1 ? 'text-amber-500' :
                    entry.rank === 2 ? 'text-gray-400' :
                    entry.rank === 3 ? 'text-orange-400' : 'text-gray-500'
                  }`}>
                    {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                    {entry.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {entry.name} {entry.isYou && <span className="text-primary-500">(You)</span>}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    <CountUp end={entry.xp} duration={1.5} separator="," /> XP
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Courses & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiAcademicCap className="h-5 w-5 text-primary-500" />
                My Courses
              </h3>
              <Link to="/student/courses" className="text-sm text-primary-600 hover:underline">
                See All
              </Link>
            </div>
            <div className="space-y-4">
              {d.recentCourses?.map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${
                    ['from-blue-500 to-blue-600', 'from-emerald-500 to-emerald-600', 'from-violet-500 to-violet-600', 'from-orange-500 to-orange-600'][i % 4]
                  } flex items-center justify-center text-white shadow-lg`}>
                    <HiBookOpen className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500">{course.instructor?.name}</p>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiCalendar className="h-5 w-5 text-red-500" />
                Upcoming Deadlines
              </h3>
            </div>
            <div className="space-y-4">
              {d.upcomingDeadlines?.map((item, i) => {
                const dueDate = new Date(item.dueDate);
                const daysLeft = Math.ceil((dueDate - new Date()) / 86400000);
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      item.type === 'quiz'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {item.type === 'quiz' ? <HiSparkles className="h-5 w-5" /> : <HiCheckCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.course}</p>
                    </div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                      daysLeft <= 1
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        : daysLeft <= 3
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {daysLeft <= 0 ? 'Overdue' : `${daysLeft}d left`}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HiStar className="h-5 w-5 text-amber-500" />
              Recent Badges
            </h3>
            <Link to="/student/badges" className="text-sm text-primary-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.recentBadges?.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30"
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white">{badge.name}</p>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'AI Tutor', icon: HiSparkles, to: '/student/ai-tutor', color: 'from-violet-500 to-purple-600' },
              { label: 'My Courses', icon: HiBookOpen, to: '/student/courses', color: 'from-blue-500 to-cyan-500' },
              { label: 'Leaderboard', icon: HiChartBar, to: '/student/leaderboard', color: 'from-amber-500 to-orange-500' },
              { label: 'Live Class', icon: HiPlay, to: '/student/live-classes', color: 'from-red-500 to-pink-500' },
            ].map((action, i) => (
              <Link key={action.label} to={action.to}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <action.icon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{action.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;

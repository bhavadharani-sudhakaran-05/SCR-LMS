import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiAcademicCap, HiUserGroup, HiClipboardCheck, HiVideoCamera,
  HiChartBar, HiTrendingUp, HiClock, HiExclamationCircle,
  HiBookOpen, HiPlusCircle, HiCalendar, HiEye,
} from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'];

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/api/dashboard/teacher');
        setDashData(data.data);
      } catch {
        setDashData({
          totalStudents: 248,
          activeCourses: 8,
          pendingGrading: 23,
          upcomingClasses: 4,
          avgClassScore: 78,
          courseCompletionRate: 82,
          recentSubmissions: [
            { _id: '1', student: 'Alex Robinson', assignment: 'Math HW #12', course: 'Advanced Mathematics', submittedAt: new Date(Date.now() - 3600000).toISOString(), status: 'pending' },
            { _id: '2', student: 'Sarah Kim', assignment: 'Physics Lab Report', course: 'Physics Fundamentals', submittedAt: new Date(Date.now() - 7200000).toISOString(), status: 'pending' },
            { _id: '3', student: 'Mike Torres', assignment: 'CS Project Phase 2', course: 'Computer Science 101', submittedAt: new Date(Date.now() - 10800000).toISOString(), status: 'graded' },
            { _id: '4', student: 'Emma Wilson', assignment: 'Essay: Shakespeare', course: 'English Literature', submittedAt: new Date(Date.now() - 14400000).toISOString(), status: 'pending' },
          ],
          atRiskStudents: [
            { _id: '1', name: 'James P.', course: 'Advanced Mathematics', grade: 42, trend: 'declining', lastActive: '3 days ago' },
            { _id: '2', name: 'Olivia M.', course: 'Physics Fundamentals', grade: 48, trend: 'declining', lastActive: '5 days ago' },
            { _id: '3', name: 'Daniel H.', course: 'Computer Science 101', grade: 55, trend: 'stable', lastActive: '1 day ago' },
          ],
          gradeDistribution: [
            { range: 'A (90-100)', count: 45 },
            { range: 'B (80-89)', count: 62 },
            { range: 'C (70-79)', count: 58 },
            { range: 'D (60-69)', count: 38 },
            { range: 'F (<60)', count: 15 },
          ],
          weeklyActivity: [
            { day: 'Mon', submissions: 12, attendance: 92 },
            { day: 'Tue', submissions: 18, attendance: 95 },
            { day: 'Wed', submissions: 8, attendance: 88 },
            { day: 'Thu', submissions: 25, attendance: 94 },
            { day: 'Fri', submissions: 15, attendance: 90 },
          ],
          upcomingSchedule: [
            { _id: '1', title: 'Advanced Math - Calculus', time: '9:00 AM', date: 'Today', students: 32 },
            { _id: '2', title: 'Physics Lab Session', time: '11:30 AM', date: 'Today', students: 28 },
            { _id: '3', title: 'CS101 Office Hours', time: '2:00 PM', date: 'Tomorrow', students: 15 },
            { _id: '4', title: 'English Lit Discussion', time: '10:00 AM', date: 'Wed', students: 25 },
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent"
        />
      </div>
    );
  }

  const d = dashData;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white"
      >
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{ width: Math.random() * 100 + 50, height: Math.random() * 100 + 50, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity }}
            />
          ))}
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Hello, {user?.name?.split(' ')[0] || 'Teacher'}! 👋
            </h1>
            <p className="mt-2 text-white/80 text-lg">
              You have <span className="font-bold text-amber-300">{d.pendingGrading}</span> submissions to grade and{' '}
              <span className="font-bold text-amber-300">{d.upcomingClasses}</span> upcoming classes.
            </p>
          </div>
          <div className="hidden lg:flex gap-3">
            <Link to="/teacher/courses/create">
              <Button variant="glass" size="sm" icon={HiPlusCircle}>
                New Course
              </Button>
            </Link>
            <Link to="/teacher/live-class">
              <Button variant="glass" size="sm" icon={HiVideoCamera}>
                Start Class
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={d.totalStudents} icon={HiUserGroup} color="blue" change={5.2} delay={0} />
        <StatCard title="Active Courses" value={d.activeCourses} icon={HiBookOpen} color="green" change={2} delay={0.1} />
        <StatCard title="Pending Grading" value={d.pendingGrading} icon={HiClipboardCheck} color="amber" delay={0.2} />
        <StatCard title="Avg Class Score" value={`${d.avgClassScore}%`} icon={HiTrendingUp} color="purple" change={1.8} delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={d.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="submissions" fill="#6366f1" radius={[6, 6, 0, 0]} name="Submissions" />
                <Bar dataKey="attendance" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={d.gradeDistribution}
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="range"
                >
                  {d.gradeDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {d.gradeDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {item.range.split(' ')[0]}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Submissions & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiClipboardCheck className="h-5 w-5 text-primary-500" />
                Recent Submissions
              </h3>
              <Link to="/teacher/grading" className="text-sm text-primary-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {d.recentSubmissions?.map((sub, i) => (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {sub.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{sub.assignment}</p>
                    <p className="text-xs text-gray-500">{sub.student} • {sub.course}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    sub.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {sub.status === 'pending' ? 'Grade' : 'Graded'}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Schedule */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HiCalendar className="h-5 w-5 text-emerald-500" />
                Upcoming Schedule
              </h3>
            </div>
            <div className="space-y-3">
              {d.upcomingSchedule?.map((cls, i) => (
                <motion.div
                  key={cls._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs text-gray-500">{cls.date}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{cls.time}</p>
                  </div>
                  <div className="h-10 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{cls.title}</p>
                    <p className="text-xs text-gray-500">{cls.students} students enrolled</p>
                  </div>
                  <Button variant="outline" size="xs">Join</Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* At-Risk Students */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HiExclamationCircle className="h-5 w-5 text-red-500" />
              At-Risk Students
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {d.atRiskStudents?.map((student, i) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.course}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600 font-bold">{student.grade}% Grade</span>
                  <span className="text-gray-500 text-xs">Active: {student.lastActive}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;

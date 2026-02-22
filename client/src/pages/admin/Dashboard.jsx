import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiUserGroup, HiAcademicCap, HiCurrencyDollar, HiServer,
  HiTrendingUp, HiShieldCheck, HiChartBar, HiCog,
  HiUserAdd, HiExclamation, HiCheckCircle, HiClock,
} from 'react-icons/hi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/api/dashboard/admin');
        setDashData(data.data);
      } catch {
        setDashData({
          totalUsers: 1247,
          totalStudents: 985,
          totalTeachers: 52,
          totalParents: 210,
          totalCourses: 145,
          activeSessions: 328,
          storageUsed: '45.2 GB',
          systemHealth: 99.8,
          monthlyRevenue: 28500,
          newUsersThisMonth: 87,
          userGrowth: [
            { month: 'Jan', users: 520 },
            { month: 'Feb', users: 610 },
            { month: 'Mar', users: 740 },
            { month: 'Apr', users: 820 },
            { month: 'May', users: 950 },
            { month: 'Jun', users: 1100 },
            { month: 'Jul', users: 1247 },
          ],
          roleDistribution: [
            { name: 'Students', value: 985 },
            { name: 'Teachers', value: 52 },
            { name: 'Parents', value: 210 },
          ],
          coursesByCategory: [
            { category: 'Math', count: 28 },
            { category: 'Science', count: 24 },
            { category: 'CS', count: 32 },
            { category: 'English', count: 18 },
            { category: 'Arts', count: 12 },
            { category: 'Other', count: 31 },
          ],
          recentUsers: [
            { _id: '1', name: 'John Smith', email: 'john@example.com', role: 'student', createdAt: new Date(Date.now() - 3600000).toISOString() },
            { _id: '2', name: 'Prof. Davis', email: 'davis@example.com', role: 'teacher', createdAt: new Date(Date.now() - 7200000).toISOString() },
            { _id: '3', name: 'Mary Johnson', email: 'mary@example.com', role: 'parent', createdAt: new Date(Date.now() - 10800000).toISOString() },
            { _id: '4', name: 'Emily Chen', email: 'emily@example.com', role: 'student', createdAt: new Date(Date.now() - 14400000).toISOString() },
            { _id: '5', name: 'Robert Lee', email: 'robert@example.com', role: 'student', createdAt: new Date(Date.now() - 18000000).toISOString() },
          ],
          systemAlerts: [
            { type: 'info', message: 'Database backup completed', time: '2 hours ago' },
            { type: 'warning', message: 'Storage reaching 80% capacity', time: '5 hours ago' },
            { type: 'success', message: 'SSL certificate renewed', time: '1 day ago' },
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

  const d = dashData;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 p-8 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Admin Control Center 🛡️</h1>
          <p className="mt-2 text-white/70 text-lg">
            System health: <span className="text-emerald-400 font-bold">{d.systemHealth}%</span> •{' '}
            <span className="text-cyan-400 font-bold">{d.activeSessions}</span> active sessions
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={d.totalUsers} icon={HiUserGroup} color="blue" change={7.5} delay={0} />
        <StatCard title="Active Courses" value={d.totalCourses} icon={HiAcademicCap} color="green" change={12} delay={0.1} />
        <StatCard title="New This Month" value={d.newUsersThisMonth} icon={HiUserAdd} color="purple" change={15} delay={0.2} />
        <StatCard title="Storage Used" value={d.storageUsed} icon={HiServer} color="amber" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={d.userGrowth}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fill="url(#userGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Role Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">User Roles</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={d.roleDistribution} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {d.roleDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {d.roleDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Courses by Category & Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courses by Category */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Courses by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={d.coursesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {d.coursesByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Users */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <HiUserAdd className="h-5 w-5 text-primary-500" /> Recent Users
            </h3>
            <div className="space-y-3">
              {d.recentUsers?.map((u, i) => (
                <motion.div key={u._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    u.role === 'student' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    u.role === 'teacher' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                    'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}>
                    {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    u.role === 'student' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    u.role === 'teacher' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {u.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* System Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <HiShieldCheck className="h-5 w-5 text-emerald-500" /> System Alerts
          </h3>
          <div className="space-y-3">
            {d.systemAlerts?.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-xl border ${
                  alert.type === 'success' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/30' :
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/30' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/30'
                }`}
              >
                {alert.type === 'success' ? <HiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> :
                  alert.type === 'warning' ? <HiExclamation className="h-5 w-5 text-amber-500 shrink-0" /> :
                  <HiShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />}
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{alert.message}</span>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

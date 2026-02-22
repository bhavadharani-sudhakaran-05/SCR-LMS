import { motion } from 'framer-motion';
import { HiChartBar, HiTrendingUp, HiUserGroup, HiAcademicCap, HiClock } from 'react-icons/hi';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const monthlyData = [
  { month: 'Jan', avgGrade: 72, submissions: 120, attendance: 88 },
  { month: 'Feb', avgGrade: 75, submissions: 145, attendance: 91 },
  { month: 'Mar', avgGrade: 78, submissions: 160, attendance: 89 },
  { month: 'Apr', avgGrade: 76, submissions: 135, attendance: 92 },
  { month: 'May', avgGrade: 80, submissions: 170, attendance: 94 },
  { month: 'Jun', avgGrade: 82, submissions: 185, attendance: 93 },
  { month: 'Jul', avgGrade: 85, submissions: 190, attendance: 95 },
];

const coursePerformance = [
  { course: 'Math', avgGrade: 78, students: 32 },
  { course: 'Physics', avgGrade: 72, students: 28 },
  { course: 'CS 101', avgGrade: 85, students: 45 },
  { course: 'English', avgGrade: 80, students: 22 },
];

const engagementData = [
  { name: 'Very Active', value: 45 },
  { name: 'Active', value: 85 },
  { name: 'Moderate', value: 62 },
  { name: 'Low', value: 38 },
  { name: 'Inactive', value: 18 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiChartBar className="text-primary-500" /> Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Overview of student performance and course metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Grade" value="82%" icon={HiTrendingUp} color="green" change={3.5} delay={0} />
        <StatCard title="Total Students" value={248} icon={HiUserGroup} color="blue" change={5.2} delay={0.1} />
        <StatCard title="Completion Rate" value="78%" icon={HiAcademicCap} color="purple" change={2.1} delay={0.2} />
        <StatCard title="Avg Study Time" value="3.2h" icon={HiClock} color="amber" change={8.4} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="avgGrade" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} name="Avg Grade" />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Attendance %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Student Engagement</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={engagementData} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {engagementData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {engagementData.map((item, i) => (
                <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />{item.name}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Course Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="avgGrade" radius={[6, 6, 0, 0]} name="Avg Grade">
                {coursePerformance.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;

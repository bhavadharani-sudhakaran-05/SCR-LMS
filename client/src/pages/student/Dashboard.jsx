import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiAcademicCap, HiBookOpen, HiLightningBolt, HiFire,
  HiClock, HiStar, HiTrendingUp, HiChartBar,
  HiPlay, HiCheckCircle, HiCalendar, HiSparkles,
} from 'react-icons/hi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';

/* ───────── static data ───────── */
const weeklyData = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 200 },
  { day: 'Wed', xp: 80 },
  { day: 'Thu', xp: 350 },
  { day: 'Fri', xp: 180 },
  { day: 'Sat', xp: 420 },
  { day: 'Sun', xp: 250 },
];

/* ───────── tiny helpers ───────── */
const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.35 },
});

/* ───────── section wrapper with guaranteed padding ───────── */
const Section = ({ children, style, ...rest }) => (
  <div style={{ width: '100%', boxSizing: 'border-box', ...style }} {...rest}>
    {children}
  </div>
);

/* ───────── card shell ───────── */
const Panel = ({ children, style, className = '' }) => (
  <div
    className={`bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border ${className}`}
    style={{
      borderRadius: 16,
      padding: 24,
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

/* ───────── stat card ───────── */
const Stat = ({ title, value, icon: Icon, accent, delay = 0 }) => {
  const bg = {
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  }[accent] || 'bg-gray-100 text-gray-600';

  const numVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.]/g, ''));
  const suffix = typeof value === 'string' ? value.replace(/[\d.,]/g, '').trim() : '';

  return (
    <motion.div {...anim(delay)}>
      <Panel style={{ height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400" style={{ marginBottom: 8 }}>{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {!isNaN(numVal) ? <CountUp end={numVal} duration={1.5} separator="," /> : value}
              {suffix}
            </p>
          </div>
          {Icon && (
            <div className={bg} style={{ borderRadius: 12, padding: 10 }}>
              <Icon style={{ width: 22, height: 22 }} />
            </div>
          )}
        </div>
      </Panel>
    </motion.div>
  );
};

/* ═══════════════════ MAIN ═══════════════════ */
const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/student');
        setDashData(data.data);
      } catch {
        setDashData({
          enrolledCourses: 6,
          completedCourses: 2,
          avgGrade: 87,
          upcomingAssignments: 3,
          totalXP: user?.xpPoints || 4250,
          streakDays: user?.streakCount || 15,
          level: user?.level || 9,
          recentCourses: [
            { _id: '1', title: 'Advanced Mathematics', progress: 72, instructor: { name: 'Dr. Smith' } },
            { _id: '2', title: 'Physics Fundamentals', progress: 45, instructor: { name: 'Prof. Johnson' } },
            { _id: '3', title: 'Computer Science 101', progress: 91, instructor: { name: 'Dr. Lee' } },
            { _id: '4', title: 'English Literature', progress: 33, instructor: { name: 'Ms. Brown' } },
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
            { name: 'Alex R.', xp: 5200, rank: 1 },
            { name: user?.name || 'You', xp: user?.xpPoints || 4250, rank: 2, isYou: true },
            { name: 'Sarah K.', xp: 3900, rank: 3 },
            { name: 'Mike T.', xp: 3650, rank: 4 },
            { name: 'Emma W.', xp: 3400, rank: 5 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  /* random bubble positions (stable per mount) */
  const bubbles = useMemo(
    () => Array.from({ length: 5 }, () => ({
      w: Math.random() * 100 + 40,
      l: Math.random() * 90,
      t: Math.random() * 80,
    })),
    [],
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #6366f1', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  const d = dashData;
  const xpToNext = ((d.totalXP % 500) / 500) * 100;

  const courseColors = [
    'from-blue-500 to-blue-600',
    'from-emerald-500 to-emerald-600',
    'from-violet-500 to-violet-600',
    'from-orange-500 to-orange-600',
  ];

  const quickActions = [
    { label: 'AI Tutor', icon: HiSparkles, to: '/student/ai-tutor', color: 'from-violet-500 to-purple-600' },
    { label: 'My Courses', icon: HiBookOpen, to: '/student/courses', color: 'from-blue-500 to-cyan-500' },
    { label: 'Leaderboard', icon: HiChartBar, to: '/student/leaderboard', color: 'from-amber-500 to-orange-500' },
    { label: 'Live Class', icon: HiPlay, to: '/student/live-classes', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: '100%', overflow: 'hidden' }}>

      {/* ─── WELCOME BANNER ─── */}
      <motion.div {...anim(0)}>
        <div
          className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600"
          style={{ position: 'relative', borderRadius: 16, padding: '32px 28px', overflow: 'hidden', color: '#fff' }}
        >
          {bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: b.w,
                height: b.w,
                left: `${b.l}%`,
                top: `${b.t}%`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                pointerEvents: 'none',
              }}
            />
          ))}

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', minWidth: 0 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p style={{ marginTop: 8, fontSize: 15, opacity: 0.82 }}>
                {d.streakDays > 0
                  ? `You're on a ${d.streakDays}-day streak! Keep it up! 🔥`
                  : 'Start learning today to build your streak!'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72 }}>
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
                <p style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>{Math.round(xpToNext)}% to next</p>
              </div>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '12px 20px' }}>
                <HiFire style={{ width: 24, height: 24, color: '#fbbf24', margin: '0 auto' }} />
                <p style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>{d.streakDays}</p>
                <p style={{ fontSize: 11, opacity: 0.65 }}>Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── STAT CARDS ─── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <Stat title="Total XP" value={d.totalXP} icon={HiLightningBolt} accent="amber" delay={0.1} />
          <Stat title="Enrolled Courses" value={d.enrolledCourses} icon={HiBookOpen} accent="blue" delay={0.15} />
          <Stat title="Average Grade" value={`${d.avgGrade}%`} icon={HiTrendingUp} accent="green" delay={0.2} />
          <Stat title="Due Soon" value={d.upcomingAssignments} icon={HiClock} accent="red" delay={0.25} />
        </div>
      </Section>

      {/* ─── CHART + LEADERBOARD ─── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="lg:!grid-cols-[2fr_1fr]">
          {/* XP Chart */}
          <motion.div {...anim(0.3)}>
            <Panel>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">XP Progress</h3>
                <span className="text-xs text-gray-400">This Week</span>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sdXpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-gray-400" />
                    <YAxis tick={{ fontSize: 12 }} className="text-gray-400" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: 10,
                        color: '#fff',
                        fontSize: 13,
                      }}
                    />
                    <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={2.5} fill="url(#sdXpGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </motion.div>

          {/* Leaderboard */}
          <motion.div {...anim(0.35)}>
            <Panel style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HiStar style={{ width: 18, height: 18 }} className="text-amber-500" />
                  Leaderboard
                </h3>
                <Link to="/student/leaderboard" className="text-xs text-primary-600 hover:underline">View All</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {d.leaderboard?.map((entry, i) => (
                  <div
                    key={i}
                    className={entry.isYou
                      ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, transition: 'background .15s' }}
                  >
                    <span style={{ width: 22, textAlign: 'center', fontSize: 14, fontWeight: 700 }}
                      className={entry.rank === 1 ? 'text-amber-500' : entry.rank === 2 ? 'text-gray-400' : entry.rank === 3 ? 'text-orange-400' : 'text-gray-500'}>
                      {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                    </span>
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600"
                      style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {entry.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white" style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {entry.name}{entry.isYou && <span className="text-primary-500 ml-1">(You)</span>}
                    </span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400" style={{ flexShrink: 0 }}>
                      <CountUp end={entry.xp} duration={1.5} separator="," /> XP
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </div>
      </Section>

      {/* ─── COURSES + DEADLINES ─── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="lg:!grid-cols-2">
          {/* My Courses */}
          <motion.div {...anim(0.4)}>
            <Panel>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HiAcademicCap style={{ width: 18, height: 18 }} className="text-primary-500" />
                  My Courses
                </h3>
                <Link to="/student/courses" className="text-xs text-primary-600 hover:underline">See All</Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {d.recentCourses?.map((course, i) => (
                  <div
                    key={course._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 group cursor-pointer"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 8px', borderRadius: 12, transition: 'background .15s' }}
                  >
                    <div className={`bg-gradient-to-br ${courseColors[i % 4]}`}
                      style={{ width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                      <HiBookOpen style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color .15s' }}>
                        {course.title}
                      </p>
                      <p className="text-xs text-gray-400" style={{ marginTop: 2 }}>{course.instructor?.name}</p>
                    </div>
                    <div style={{ width: 56, flexShrink: 0, textAlign: 'right' }}>
                      <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
                      <div className="bg-gray-200 dark:bg-gray-700" style={{ height: 5, borderRadius: 99, marginTop: 4, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                          className="bg-gradient-to-r from-primary-500 to-primary-600"
                          style={{ height: '100%', borderRadius: 99 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div {...anim(0.45)}>
            <Panel>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HiCalendar style={{ width: 18, height: 18 }} className="text-red-500" />
                  Upcoming Deadlines
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {d.upcomingDeadlines?.map((item, i) => {
                  const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / 86400000);
                  const badgeClass = daysLeft <= 1
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : daysLeft <= 3
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';

                  return (
                    <div
                      key={item._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 8px', borderRadius: 12, transition: 'background .15s' }}
                    >
                      <div
                        className={item.type === 'quiz'
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}
                        style={{ width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      >
                        {item.type === 'quiz'
                          ? <HiSparkles style={{ width: 18, height: 18 }} />
                          : <HiCheckCircle style={{ width: 18, height: 18 }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400" style={{ marginTop: 2 }}>{item.course}</p>
                      </div>
                      <span
                        className={`text-xs font-bold ${badgeClass}`}
                        style={{ flexShrink: 0, padding: '4px 12px', borderRadius: 99, whiteSpace: 'nowrap' }}
                      >
                        {daysLeft <= 0 ? 'Overdue' : `${daysLeft}d left`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </motion.div>
        </div>
      </Section>

      {/* ─── RECENT BADGES ─── */}
      <motion.div {...anim(0.5)}>
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 className="text-base font-bold text-gray-900 dark:text-white" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HiStar style={{ width: 18, height: 18 }} className="text-amber-500" />
              Recent Badges
            </h3>
            <Link to="/student/badges" className="text-xs text-primary-600 hover:underline">View All</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {d.recentBadges?.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.04 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-800/30"
                style={{ textAlign: 'center', padding: '24px 16px', borderRadius: 16 }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{badge.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white" style={{ fontSize: 14 }}>{badge.name}</p>
                <p className="text-xs text-gray-500" style={{ marginTop: 4 }}>{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </Panel>
      </motion.div>

      {/* ─── QUICK ACTIONS ─── */}
      <motion.div {...anim(0.55)}>
        <Panel>
          <h3 className="text-base font-bold text-gray-900 dark:text-white" style={{ marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {quickActions.map((a) => (
              <Link key={a.label} to={a.to}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`bg-gradient-to-r ${a.color}`}
                  style={{ padding: '20px 12px', borderRadius: 14, textAlign: 'center', color: '#fff', cursor: 'pointer' }}
                >
                  <a.icon style={{ width: 28, height: 28, margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </Panel>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;

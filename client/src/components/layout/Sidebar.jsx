import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome, HiAcademicCap, HiBookOpen, HiVideoCamera,
  HiChat, HiChartBar, HiCog, HiLogout, HiLightningBolt,
  HiStar, HiPuzzle, HiClipboardList, HiUserGroup,
  HiDesktopComputer, HiCalendar, HiDocumentText, HiCash,
  HiChevronLeft, HiChevronRight, HiCollection , HiSparkles,
} from 'react-icons/hi';
import useAuthStore from '../../store/authStore';

const sidebarLinks = {
  student: [
    { name: 'Dashboard', path: '/student', icon: HiHome },
    { name: 'My Courses', path: '/student/courses', icon: HiBookOpen },
    { name: 'Live Classes', path: '/student/live-classes', icon: HiVideoCamera },
    { name: 'AI Tutor', path: '/student/ai-tutor', icon: HiSparkles },
    { name: 'Assignments', path: '/student/assignments', icon: HiClipboardList },
    { name: 'Quizzes', path: '/student/quizzes', icon: HiPuzzle },
    { name: 'Leaderboard', path: '/student/leaderboard', icon: HiStar },
    { name: 'Badges', path: '/student/badges', icon: HiLightningBolt },
    { name: 'Study Planner', path: '/student/planner', icon: HiCalendar },
    { name: 'Analytics', path: '/student/analytics', icon: HiChartBar },
    { name: 'Chat', path: '/student/chat', icon: HiChat },
  ],
  teacher: [
    { name: 'Dashboard', path: '/teacher', icon: HiHome },
    { name: 'My Courses', path: '/teacher/courses', icon: HiBookOpen },
    { name: 'Course Builder', path: '/teacher/course-builder', icon: HiCollection },
    { name: 'Live Classes', path: '/teacher/live-classes', icon: HiVideoCamera },
    { name: 'Assignments', path: '/teacher/assignments', icon: HiClipboardList },
    { name: 'Quiz Builder', path: '/teacher/quizzes', icon: HiPuzzle },
    { name: 'Students', path: '/teacher/students', icon: HiUserGroup },
    { name: 'Analytics', path: '/teacher/analytics', icon: HiChartBar },
    { name: 'Chat', path: '/teacher/chat', icon: HiChat },
  ],
  admin: [
    { name: 'Dashboard', path: '/admin', icon: HiHome },
    { name: 'Users', path: '/admin/users', icon: HiUserGroup },
    { name: 'Courses', path: '/admin/courses', icon: HiAcademicCap },
    { name: 'Reports', path: '/admin/reports', icon: HiDocumentText },
    { name: 'Analytics', path: '/admin/analytics', icon: HiChartBar },
    { name: 'Fees', path: '/admin/fees', icon: HiCash },
    { name: 'Settings', path: '/admin/settings', icon: HiCog },
  ],
  parent: [
    { name: 'Dashboard', path: '/parent', icon: HiHome },
    { name: 'Child Progress', path: '/parent/progress', icon: HiChartBar },
    { name: 'Attendance', path: '/parent/attendance', icon: HiCalendar },
    { name: 'Reports', path: '/parent/reports', icon: HiDocumentText },
    { name: 'Fees', path: '/parent/fees', icon: HiCash },
  ],
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const links = sidebarLinks[user?.role] || sidebarLinks.student;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex h-screen flex-col bg-white dark:bg-dark-card border-r border-gray-100 dark:border-dark-border shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-100 dark:border-dark-border">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white font-bold text-lg shrink-0"
        >
          A
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h1 className="text-xl font-bold gradient-text">Acadrix</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Smart LMS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === `/${user?.role}`}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <link.icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110`} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm whitespace-nowrap"
                >
                  {link.name}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-100 dark:border-dark-border p-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=6366f1&color=fff&bold=true`
            }
            alt={user?.name}
            className="h-9 w-9 rounded-xl object-cover shrink-0"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 mt-1 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <HiLogout className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
      >
        {collapsed ? (
          <HiChevronRight className="h-3 w-3 text-gray-500" />
        ) : (
          <HiChevronLeft className="h-3 w-3 text-gray-500" />
        )}
      </button>
    </motion.aside>
  );
};

export default Sidebar;

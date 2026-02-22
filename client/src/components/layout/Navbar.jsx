import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiSearch, HiBell, HiMoon, HiSun, HiMenu,
  HiLightningBolt, HiFire,
} from 'react-icons/hi';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';

const Navbar = () => {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Search */}
        <div className="flex items-center gap-4 flex-1">
          <motion.div
            animate={{ width: searchOpen ? 400 : 250 }}
            className="relative hidden md:block"
          >
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, lessons, students..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="w-full rounded-xl bg-gray-50 dark:bg-dark-bg border border-transparent focus:border-primary-300 dark:focus:border-primary-700 pl-10 pr-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none transition-all duration-200"
            />
          </motion.div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* XP & Streak (for students) */}
          {user?.role === 'student' && (
            <div className="hidden sm:flex items-center gap-3 mr-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl"
              >
                <HiLightningBolt className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {user?.xpPoints || 0} XP
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-xl"
              >
                <HiFire className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                  {user?.streakCount || 0}
                </span>
              </motion.div>
            </div>
          )}

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <HiSun className="h-5 w-5 text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <HiMoon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <HiBell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-card" />
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-dark-border">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer border-b border-gray-50 dark:border-gray-800"
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          📚 New assignment posted in Mathematics
                        </p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role} · Lvl {user?.level || 1}
              </p>
            </div>
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=6366f1&color=fff&bold=true`
              }
              alt={user?.name}
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary-100 dark:ring-primary-900"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

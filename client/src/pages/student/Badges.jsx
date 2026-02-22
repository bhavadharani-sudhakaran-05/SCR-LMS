import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiLockClosed, HiCheckCircle, HiSparkles } from 'react-icons/hi';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import Card from '../../components/ui/Card';

const allBadges = [
  { id: 'first_login', name: 'First Steps', icon: '🎯', description: 'Complete your first login', xpReward: 50, category: 'Getting Started' },
  { id: 'speed_learner', name: 'Speed Learner', icon: '⚡', description: 'Complete 5 lessons in one day', xpReward: 100, category: 'Learning' },
  { id: 'quiz_master', name: 'Quiz Master', icon: '🏆', description: 'Score 100% on 3 quizzes', xpReward: 200, category: 'Quizzes' },
  { id: 'streak_3', name: 'On Fire', icon: '🔥', description: '3-day learning streak', xpReward: 75, category: 'Streaks' },
  { id: 'streak_7', name: 'Week Warrior', icon: '💪', description: '7-day learning streak', xpReward: 150, category: 'Streaks' },
  { id: 'streak_30', name: 'Streak Legend', icon: '👑', description: '30-day learning streak', xpReward: 500, category: 'Streaks' },
  { id: 'first_course', name: 'Enrolled!', icon: '📚', description: 'Enroll in your first course', xpReward: 50, category: 'Getting Started' },
  { id: 'course_complete', name: 'Graduate', icon: '🎓', description: 'Complete your first course', xpReward: 300, category: 'Learning' },
  { id: 'five_courses', name: 'Scholar', icon: '📖', description: 'Complete 5 courses', xpReward: 500, category: 'Learning' },
  { id: 'helper', name: 'Helpful Hand', icon: '🤝', description: 'Answer 10 forum questions', xpReward: 150, category: 'Community' },
  { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', description: 'Send 100 chat messages', xpReward: 100, category: 'Community' },
  { id: 'night_owl', name: 'Night Owl', icon: '🦉', description: 'Study after midnight', xpReward: 75, category: 'Fun' },
  { id: 'early_bird', name: 'Early Bird', icon: '🐦', description: 'Study before 6 AM', xpReward: 75, category: 'Fun' },
  { id: 'perfect_week', name: 'Perfect Week', icon: '💎', description: 'Complete all assignments on time for a week', xpReward: 250, category: 'Learning' },
  { id: 'xp_1000', name: 'XP Collector', icon: '✨', description: 'Earn 1,000 XP total', xpReward: 100, category: 'Milestones' },
  { id: 'xp_5000', name: 'XP Champion', icon: '🌟', description: 'Earn 5,000 XP total', xpReward: 250, category: 'Milestones' },
  { id: 'assignment_10', name: 'Taskmaster', icon: '📝', description: 'Submit 10 assignments', xpReward: 150, category: 'Assignments' },
  { id: 'code_warrior', name: 'Code Warrior', icon: '💻', description: 'Complete 20 coding challenges', xpReward: 300, category: 'Coding' },
];

const Badges = () => {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('All');

  const userBadges = user?.badges?.map(b => b.badgeId) || ['first_login', 'speed_learner', 'quiz_master', 'streak_3', 'streak_7', 'first_course', 'helper', 'xp_1000'];
  const earnedCount = userBadges.length;
  const totalCount = allBadges.length;
  const progress = Math.round((earnedCount / totalCount) * 100);

  const categories = ['All', ...new Set(allBadges.map(b => b.category))];
  const filtered = filter === 'All' ? allBadges : allBadges.filter(b => b.category === filter);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiStar className="text-amber-500" /> Badges & Achievements
        </h1>
        <p className="text-gray-500 mt-1">Collect them all! You've earned {earnedCount} of {totalCount} badges.</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Collection Progress</span>
            <span className="text-sm font-bold text-primary-600">{progress}%</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <div className="mt-3 flex gap-6 text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">✅ {earnedCount} Earned</span>
            <span className="text-gray-500">🔒 {totalCount - earnedCount} Locked</span>
          </div>
        </Card>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((badge, i) => {
          const earned = userBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-5 rounded-2xl text-center transition-all ${
                earned
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/15 border-2 border-amber-200 dark:border-amber-800/40 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              {earned && (
                <HiCheckCircle className="absolute top-2 right-2 h-5 w-5 text-emerald-500" />
              )}
              {!earned && (
                <HiLockClosed className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
              )}
              <div className={`text-4xl mb-3 ${!earned ? 'grayscale' : ''}`}>{badge.icon}</div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{badge.name}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{badge.description}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <HiSparkles className="h-3 w-3" /> +{badge.xpReward} XP
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;

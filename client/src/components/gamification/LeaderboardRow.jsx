import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { HiTrendingUp, HiTrendingDown, HiMinus } from 'react-icons/hi';

const LeaderboardRow = ({ rank, name, xp, avatar, level, change = 0, isCurrentUser = false, index = 0 }) => {
  const medalColors = {
    1: 'from-amber-300 to-amber-500 text-amber-900 shadow-amber-400/30',
    2: 'from-gray-300 to-gray-400 text-gray-700 shadow-gray-400/30',
    3: 'from-orange-300 to-orange-500 text-orange-900 shadow-orange-400/30',
  };

  const changeIcon = change > 0 ? <HiTrendingUp className="h-3 w-3 text-emerald-500" /> :
                     change < 0 ? <HiTrendingDown className="h-3 w-3 text-red-500" /> :
                     <HiMinus className="h-3 w-3 text-gray-400" />;

  return (
    <motion.div
      className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
        isCurrentUser
          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: 4 }}
    >
      {/* Rank */}
      <div className="w-8 flex-shrink-0 flex justify-center">
        {rank <= 3 ? (
          <motion.div
            className={`h-7 w-7 rounded-full bg-gradient-to-br ${medalColors[rank]} flex items-center justify-center text-xs font-black shadow-lg`}
            whileHover={{ scale: 1.2, rotate: 15 }}
          >
            {rank}
          </motion.div>
        ) : (
          <span className="text-sm font-bold text-gray-400">#{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative">
        <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${
          rank === 1 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
          rank === 2 ? 'bg-gradient-to-br from-indigo-400 to-purple-500' :
          rank === 3 ? 'bg-gradient-to-br from-rose-400 to-pink-500' :
          'bg-gradient-to-br from-gray-400 to-gray-500'
        }`}>
          {avatar || name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
        </div>
        {isCurrentUser && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-primary-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
        )}
      </div>

      {/* Name & Level */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
          {name} {isCurrentUser && <span className="text-[10px] text-primary-500">(You)</span>}
        </p>
        <p className="text-[10px] text-gray-500">Level {level}</p>
      </div>

      {/* Change */}
      <div className="flex items-center gap-0.5">
        {changeIcon}
        {change !== 0 && (
          <span className={`text-[10px] font-medium ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {Math.abs(change)}
          </span>
        )}
      </div>

      {/* XP */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          <CountUp end={xp} duration={1.5} separator="," />
        </p>
        <p className="text-[10px] text-gray-500">XP</p>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;

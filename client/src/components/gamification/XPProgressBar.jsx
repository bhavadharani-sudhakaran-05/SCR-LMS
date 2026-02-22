import { motion } from 'framer-motion';
import { HiLightningBolt } from 'react-icons/hi';
import CountUp from 'react-countup';

const XPProgressBar = ({ currentXP = 0, nextLevelXP = 1000, level = 1, showLabel = true, size = 'md' }) => {
  const progress = Math.min((currentXP / nextLevelXP) * 100, 100);

  const sizes = {
    sm: { bar: 'h-2', text: 'text-xs', icon: 'h-3 w-3', badge: 'h-5 w-5 text-[8px]' },
    md: { bar: 'h-3', text: 'text-sm', icon: 'h-4 w-4', badge: 'h-7 w-7 text-[10px]' },
    lg: { bar: 'h-4', text: 'text-base', icon: 'h-5 w-5', badge: 'h-9 w-9 text-xs' },
  };

  const s = sizes[size];

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <motion.div
              className={`${s.badge} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-md`}
              whileHover={{ scale: 1.15, rotate: 10 }}
            >
              {level}
            </motion.div>
            <span className={`${s.text} font-semibold text-gray-700 dark:text-gray-300`}>Level {level}</span>
          </div>
          <div className={`flex items-center gap-1 ${s.text} text-gray-500`}>
            <HiLightningBolt className={`${s.icon} text-amber-500`} />
            <span><CountUp end={currentXP} duration={1.5} separator="," /></span>
            <span className="text-gray-400">/ {nextLevelXP.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      <div className={`${s.bar} w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>

      {showLabel && (
        <p className="text-[10px] text-gray-400 mt-1 text-right">
          {(nextLevelXP - currentXP).toLocaleString()} XP to Level {level + 1}
        </p>
      )}
    </div>
  );
};

export default XPProgressBar;

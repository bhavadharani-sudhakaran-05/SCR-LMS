import { motion } from 'framer-motion';
import { HiFire } from 'react-icons/hi';
import CountUp from 'react-countup';

const StreakFlame = ({ streak = 0, size = 'md', showLabel = true }) => {
  const sizes = {
    sm: { container: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-xs', num: 'text-sm' },
    md: { container: 'h-14 w-14', icon: 'h-7 w-7', text: 'text-sm', num: 'text-lg' },
    lg: { container: 'h-20 w-20', icon: 'h-9 w-9', text: 'text-base', num: 'text-2xl' },
  };
  const s = sizes[size];

  const intensity = streak <= 3 ? 0 : streak <= 7 ? 1 : streak <= 14 ? 2 : streak <= 30 ? 3 : 4;
  const flames = [
    { gradient: 'from-orange-300 to-orange-400', glow: '' },
    { gradient: 'from-orange-400 to-red-500', glow: 'shadow-orange-400/30' },
    { gradient: 'from-red-400 to-red-600', glow: 'shadow-red-400/40' },
    { gradient: 'from-red-500 to-pink-600', glow: 'shadow-red-500/50' },
    { gradient: 'from-pink-500 to-purple-600', glow: 'shadow-pink-500/50' },
  ];
  const f = flames[intensity];

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        <motion.div
          className={`${s.container} rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg ${f.glow} flex items-center justify-center`}
          animate={streak > 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiFire className={`${s.icon} text-white drop-shadow-md`} />
        </motion.div>

        {/* Streak number badge */}
        <motion.div
          className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <span className={`${s.num} font-black bg-gradient-to-br ${f.gradient} bg-clip-text text-transparent leading-none`}>
            {streak}
          </span>
        </motion.div>

        {/* Flame particles */}
        {streak > 0 && [...Array(Math.min(intensity + 1, 4))].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
            style={{ bottom: '60%', left: `${30 + i * 15}%` }}
            animate={{
              y: [-2, -14 - i * 3],
              x: [(i - 1) * 3, (i - 1) * 6],
              opacity: [0.8, 0],
              scale: [1, 0.3],
            }}
            transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {showLabel && (
        <div className="text-center">
          <p className={`${s.text} font-bold text-gray-900 dark:text-white`}>
            <CountUp end={streak} duration={1} /> Day{streak !== 1 ? 's' : ''}
          </p>
          <p className="text-[10px] text-gray-500">Streak</p>
        </div>
      )}
    </motion.div>
  );
};

export default StreakFlame;

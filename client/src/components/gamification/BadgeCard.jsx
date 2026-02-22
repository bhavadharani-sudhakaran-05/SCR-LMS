import { motion } from 'framer-motion';
import { HiLockClosed } from 'react-icons/hi';

const rarityColors = {
  common: { bg: 'from-gray-400 to-gray-500', ring: 'ring-gray-300', glow: '' },
  uncommon: { bg: 'from-green-400 to-emerald-500', ring: 'ring-green-300', glow: 'shadow-green-400/30' },
  rare: { bg: 'from-blue-400 to-indigo-500', ring: 'ring-blue-300', glow: 'shadow-blue-400/30' },
  epic: { bg: 'from-purple-400 to-pink-500', ring: 'ring-purple-300', glow: 'shadow-purple-400/40' },
  legendary: { bg: 'from-amber-400 to-orange-500', ring: 'ring-amber-300', glow: 'shadow-amber-400/50' },
};

const BadgeCard = ({ badge, earned = false, size = 'md', showDetails = true, onClick }) => {
  const { name = 'Badge', icon = '🏆', description = '', rarity = 'common', xpReward = 0, earnedAt } = badge || {};
  const colors = rarityColors[rarity] || rarityColors.common;

  const sizes = {
    sm: { container: 'w-16', icon: 'h-12 w-12 text-xl', text: 'text-[10px]' },
    md: { container: 'w-24', icon: 'h-16 w-16 text-2xl', text: 'text-xs' },
    lg: { container: 'w-32', icon: 'h-20 w-20 text-3xl', text: 'text-sm' },
  };
  const s = sizes[size];

  return (
    <motion.div
      className={`flex flex-col items-center ${s.container} cursor-pointer group`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative">
        <motion.div
          className={`${s.icon} rounded-2xl flex items-center justify-center ring-2 ${
            earned
              ? `bg-gradient-to-br ${colors.bg} ${colors.ring} shadow-lg ${colors.glow}`
              : 'bg-gray-200 dark:bg-gray-700 ring-gray-200 dark:ring-gray-600'
          } transition-all`}
          initial={{ rotateY: 0 }}
          whileHover={earned ? { rotateY: 180 } : {}}
          transition={{ duration: 0.6 }}
        >
          {earned ? (
            <span className="drop-shadow-md">{icon}</span>
          ) : (
            <HiLockClosed className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          )}
        </motion.div>

        {/* Sparkle particles for earned badges */}
        {earned && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-amber-400"
                style={{ top: '20%', left: '50%' }}
                animate={{
                  x: [0, (i - 1) * 15],
                  y: [0, -12 - i * 4],
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, repeatDelay: 3 }}
              />
            ))}
          </>
        )}

        {/* Rarity dot */}
        {earned && rarity !== 'common' && (
          <div className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br ${colors.bg} ring-2 ring-white dark:ring-gray-900`} />
        )}
      </div>

      {showDetails && (
        <div className="mt-2 text-center">
          <p className={`${s.text} font-semibold ${earned ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'} leading-tight truncate max-w-full`}>
            {name}
          </p>
          {earned && xpReward > 0 && (
            <p className="text-[9px] text-amber-500 font-medium mt-0.5">+{xpReward} XP</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default BadgeCard;

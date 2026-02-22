import { motion, AnimatePresence } from 'framer-motion';
import { HiLightningBolt, HiStar, HiTrophy } from 'react-icons/hi';
import { useEffect, useState } from 'react';

const icons = {
  xp: HiLightningBolt,
  badge: HiStar,
  achievement: HiTrophy,
};

const colors = {
  xp: { bg: 'from-amber-400 to-orange-500', text: 'text-amber-400' },
  badge: { bg: 'from-purple-400 to-pink-500', text: 'text-purple-400' },
  achievement: { bg: 'from-emerald-400 to-teal-500', text: 'text-emerald-400' },
};

const AchievementToast = ({ type = 'xp', title, message, icon: customIcon, xp, duration = 4000, onDismiss }) => {
  const [show, setShow] = useState(true);
  const IconComponent = icons[type] || icons.xp;
  const color = colors[type] || colors.xp;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onDismiss?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-6 right-6 z-[200] max-w-sm w-full pointer-events-auto"
          initial={{ x: 300, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 300, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-4 flex items-start gap-3 overflow-hidden relative">
            {/* Gradient accent line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${color.bg}`} />

            {/* Icon */}
            <motion.div
              className={`h-11 w-11 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center flex-shrink-0 shadow-lg`}
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.15 }}
            >
              {customIcon ? (
                <span className="text-lg">{customIcon}</span>
              ) : (
                <IconComponent className="h-5 w-5 text-white" />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.p
                className="text-sm font-bold text-white truncate"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {title || (type === 'xp' ? 'XP Earned!' : type === 'badge' ? 'Badge Unlocked!' : 'Achievement!')}
              </motion.p>
              <motion.p
                className="text-xs text-gray-400 mt-0.5 line-clamp-2"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.p>
              {xp && (
                <motion.div
                  className={`flex items-center gap-1 mt-1.5 ${color.text} text-xs font-bold`}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <HiLightningBolt className="h-3 w-3" />
                  +{xp} XP
                </motion.div>
              )}
            </div>

            {/* Close */}
            <button onClick={() => setShow(false)} className="text-gray-500 hover:text-gray-300 transition-colors p-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress bar (auto-dismiss timer) */}
            <motion.div
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${color.bg}`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiLightningBolt, HiArrowUp } from 'react-icons/hi';
import confetti from 'canvas-confetti';

const LevelUpModal = ({ isOpen, onClose, newLevel = 1, rewards = [] }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 600);
      const t2 = setTimeout(() => setStep(2), 1400);

      // Fire confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'],
        });
      } catch (e) {
        /* confetti not available */
      }

      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 via-purple-900/90 to-gray-900 rounded-3xl p-8 max-w-sm w-full mx-4 overflow-hidden"
            initial={{ scale: 0.4, rotateZ: -10, opacity: 0 }}
            animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Background glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="h-48 w-48 rounded-full border-2 border-amber-400/20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute h-48 w-48 rounded-full border-2 border-purple-400/20"
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            {/* Arrow icon */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
                <HiArrowUp className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 mb-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: step >= 0 ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              LEVEL UP!
            </motion.h2>

            {/* Level number */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  className="text-center mb-6"
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                >
                  <span className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                    {newLevel}
                  </span>
                  <p className="text-gray-400 text-sm mt-1">You've reached a new milestone!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rewards */}
            <AnimatePresence>
              {step >= 2 && rewards.length > 0 && (
                <motion.div
                  className="space-y-2 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <p className="text-xs text-gray-400 text-center uppercase tracking-wider mb-2">Rewards Unlocked</p>
                  {rewards.map((reward, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl p-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="text-xl">{reward.icon || '🎁'}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{reward.name}</p>
                        {reward.description && (
                          <p className="text-xs text-gray-400">{reward.description}</p>
                        )}
                      </div>
                      {reward.xp && (
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                          <HiLightningBolt className="h-3 w-3" />+{reward.xp}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue button */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.button
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                >
                  Continue
                </motion.button>
              )}
            </AnimatePresence>

            {/* Floating stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: `${15 + Math.random() * 70}%`, left: `${5 + Math.random() * 90}%` }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
              >
                <HiStar className="h-3 w-3 text-amber-400/50" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpModal;

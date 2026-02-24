import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'increase',
  color = 'primary',
  suffix = '',
  prefix = '',
  delay = 0,
}) => {
  const colors = {
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-900/20',
      icon: 'bg-primary-100 dark:bg-primary-800/40 text-primary-600 dark:text-primary-400',
      text: 'text-primary-600',
    },
    secondary: {
      bg: 'bg-secondary-50 dark:bg-secondary-900/20',
      icon: 'bg-secondary-100 dark:bg-secondary-800/40 text-secondary-600 dark:text-secondary-400',
      text: 'text-secondary-600',
    },
    accent: {
      bg: 'bg-accent-50 dark:bg-accent-900/20',
      icon: 'bg-accent-100 dark:bg-accent-800/40 text-accent-600 dark:text-accent-400',
      text: 'text-accent-600',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      icon: 'bg-emerald-100 dark:bg-emerald-800/40 text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-600',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      icon: 'bg-amber-100 dark:bg-amber-800/40 text-amber-600 dark:text-amber-400',
      text: 'text-amber-600',
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-400',
      text: 'text-red-600',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'bg-blue-100 dark:bg-blue-800/40 text-blue-600 dark:text-blue-400',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      icon: 'bg-emerald-100 dark:bg-emerald-800/40 text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-600',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      icon: 'bg-amber-100 dark:bg-amber-800/40 text-amber-600 dark:text-amber-400',
      text: 'text-amber-600',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-400',
      text: 'text-red-600',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'bg-purple-100 dark:bg-purple-800/40 text-purple-600 dark:text-purple-400',
      text: 'text-purple-600',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'bg-orange-100 dark:bg-orange-800/40 text-orange-600 dark:text-orange-400',
      text: 'text-orange-600',
    },
  };

  const scheme = colors[color] || colors.primary;

  // Parse value for CountUp — handles strings like "82%", "3.2h", "45.2 GB"
  const parseValue = () => {
    if (typeof value === 'number') return { num: value, displaySuffix: suffix, dec: 0 };
    const str = String(value);
    const match = str.match(/^([\d.,]+)\s*(.*)$/);
    if (match) {
      const num = parseFloat(match[1].replace(/,/g, ''));
      const dec = match[1].includes('.') ? (match[1].split('.')[1]?.length || 1) : 0;
      return { num, displaySuffix: match[2] || suffix, dec };
    }
    return { num: null, displaySuffix: suffix, dec: 0 };
  };

  const { num, displaySuffix, dec } = parseValue();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white dark:bg-dark-card
        border border-gray-100 dark:border-dark-border
        p-6 shadow-sm hover:shadow-xl
        transition-shadow duration-300
      `}
    >
      {/* Background decoration */}
      <div className={`absolute -top-4 -right-4 h-24 w-24 rounded-full ${scheme.bg} opacity-50`} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {prefix}
            {num !== null ? (
              <>
                <CountUp end={num} duration={2} separator="," decimals={dec} />
                {displaySuffix}
              </>
            ) : (
              value
            )}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={
                  changeType === 'increase'
                    ? 'text-emerald-600'
                    : 'text-red-500'
                }
              >
                {changeType === 'increase' ? '↑' : '↓'} {change}%
              </span>
              <span className="text-gray-400">vs last week</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`rounded-2xl p-3 ${scheme.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;

import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  gradient = false,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        rounded-2xl
        ${glass
          ? 'glass-card dark:glass-card-dark'
          : gradient
          ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white'
          : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border'
        }
        ${hover ? 'hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 cursor-pointer' : ''}
        shadow-sm transition-shadow duration-300
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

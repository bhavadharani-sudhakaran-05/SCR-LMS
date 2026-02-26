import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <motion.input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            borderColor: error
              ? '#ef4444'
              : isFocused
              ? '#818cf8'
              : 'transparent',
          }}
          className={`
            w-full rounded-xl border-2 px-4 py-3.5
            text-sm text-gray-900 placeholder-gray-400
            transition-all duration-200
            bg-gray-50 focus:bg-white
            focus:outline-none focus:ring-4 focus:ring-primary-500/10
            disabled:bg-gray-100 disabled:cursor-not-allowed
            dark:bg-gray-800/60 dark:focus:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            dark:placeholder-gray-500
            ${Icon ? 'pl-12' : ''}
            ${type === 'password' ? 'pr-12' : ''}
            ${error ? 'border-red-400 focus:ring-red-500/10' : 'border-transparent'}
          `}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;

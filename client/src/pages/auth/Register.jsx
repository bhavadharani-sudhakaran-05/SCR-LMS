import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiUser, HiUserAdd } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      const data = await register(formData);
      toast.success('Account created successfully! 🎉');
      navigate(`/${data.user.role}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'student', label: 'Student', emoji: '🎓', desc: 'Learn & grow' },
    { value: 'teacher', label: 'Teacher', emoji: '👨‍🏫', desc: 'Teach & inspire' },
    { value: 'parent', label: 'Parent', emoji: '👨‍👩‍👧', desc: 'Monitor progress' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-bg">
      {/* Left - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-accent-600 via-primary-700 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-lg text-center text-white px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-4xl font-bold mb-4">
              Join the Future of Learning
            </h3>
            <p className="text-lg text-white/80 mb-8">
              10,000+ students already learning smarter with AI-powered education.
              Earn XP, unlock badges, and level up your knowledge!
            </p>

            <div className="flex justify-center gap-6 mt-8">
              {['⚡ XP Points', '🏆 Badges', '🔥 Streaks', '📊 Analytics'].map((item) => (
                <motion.div
                  key={item}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random(),
                  }}
                  className="glass-card rounded-xl px-4 py-2 text-sm font-medium"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white font-bold text-2xl shadow-lg shadow-primary-500/30"
            >
              A
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Start your personalized learning journey today
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <motion.button
                key={role.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setFormData({ ...formData, role: role.value })}
                className={`
                  flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200
                  ${formData.role === role.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                <span className="text-xl">{role.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{role.label}</span>
                <span className="text-[10px] text-gray-400">{role.desc}</span>
              </motion.button>
            ))}
          </div>

          {/* Google */}
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            icon={FcGoogle}
            onClick={() => (window.location.href = '/api/auth/google')}
          >
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 dark:bg-dark-bg px-4 text-gray-400">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              icon={HiUser}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={HiMail}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                icon={HiLockClosed}
                required
              />
              <Input
                label="Confirm"
                name="confirmPassword"
                type="password"
                placeholder="••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={HiLockClosed}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={HiUserAdd}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiLogin, HiArrowRight } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';

/* ── stable animated circle positions ── */
const bgCircles = Array.from({ length: 8 }, (_, i) => ({
  size: 60 + (i * 47) % 220,
  left: `${(i * 14 + 6) % 100}%`,
  top: `${(i * 18 + 3) % 100}%`,
  dur: 5 + (i % 5) * 1.5,
  del: (i * 0.5) % 3,
}));

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData);
      if (result.requires2FA) {
        navigate('/verify-2fa', { state: { tempToken: result.tempToken } });
      } else {
        toast.success('Welcome back! 🎉');
        navigate(`/${result.user.role}`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-dark-bg">

      {/* ━━━ LEFT — FORM ━━━ */}
      <div className="flex flex-1 items-center justify-center px-5 sm:px-8 py-10 lg:py-16 relative">
        {/* Subtle background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-400/[0.06] blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-400/[0.06] blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative w-full max-w-[420px] space-y-7"
        >
          {/* Logo + Heading */}
          <div>
            <Link to="/" className="inline-block">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white font-bold text-xl shadow-lg shadow-primary-500/25"
              >
                A
              </motion.div>
            </Link>
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Google Sign-In */}
          <div>
            <button
              onClick={() => (window.location.href = '/api/auth/google')}
              className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 dark:bg-dark-bg px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={HiLockClosed}
              required
            />

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={HiLogin}
            >
              Sign In
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
            >
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ━━━ RIGHT — ILLUSTRATION ━━━ */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Floating circles — stable positions */}
        {bgCircles.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/[0.05]"
            style={{ width: c.size, height: c.size, left: c.left, top: c.top }}
            animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
            transition={{
              duration: c.dur,
              repeat: Infinity,
              delay: c.del,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-md text-center text-white px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <h3 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight">
              AI-Powered Learning
            </h3>
            <p className="text-base text-white/70 mb-10 leading-relaxed max-w-sm mx-auto">
              Experience the future of education with personalized AI tutoring,
              gamified learning, and real-time collaboration.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: '🤖', label: 'AI Tutor' },
                { emoji: '🎮', label: 'Gamified' },
                { emoji: '📊', label: 'Analytics' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-4 text-center cursor-default"
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-xs font-semibold text-white/90">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex items-center justify-center gap-8">
              {[
                { val: '10K+', lbl: 'Students' },
                { val: '500+', lbl: 'Courses' },
                { val: '99%', lbl: 'Rating' },
              ].map((s, i) => (
                <motion.div
                  key={s.lbl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-[11px] text-white/50 font-medium mt-0.5">{s.lbl}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

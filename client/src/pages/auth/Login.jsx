import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiMail,
  HiLockClosed,
  HiLogin,
  HiAcademicCap,
  HiLightBulb,
  HiChartBar,
  HiShieldCheck,
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';

const features = [
  { icon: HiAcademicCap, title: 'Smart Learning', desc: 'AI-powered personalized paths' },
  { icon: HiLightBulb, title: 'Interactive Quizzes', desc: 'Gamified assessments & badges' },
  { icon: HiChartBar, title: 'Real-time Analytics', desc: 'Track every milestone' },
  { icon: HiShieldCheck, title: 'Safe & Secure', desc: 'Enterprise-grade security' },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData);
      if (result.requires2FA) {
        navigate('/verify-2fa', { state: { tempToken: result.tempToken } });
      } else {
        toast.success('Welcome back!');
        navigate(`/${result.user.role}`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ========== LEFT — branding panel ========== */}
      <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white p-12 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="absolute bottom-16 -right-20 h-56 w-56 rounded-full bg-accent-500/10" />
        <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-primary-400/[0.06]" />

        {/* top: logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur text-lg font-bold">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">Acadify</span>
          </Link>
        </div>

        {/* middle: headline + features */}
        <div className="relative z-10 -mt-8">
          <h2 className="text-3xl font-extrabold leading-tight">
            Welcome back<br />to Acadify
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xs leading-relaxed">
            Continue where you left off. Your courses, progress, and
            achievements are waiting for you.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 rounded-xl bg-white/[0.06] backdrop-blur-sm p-4"
              >
                <f.icon className="h-5 w-5 text-accent-300 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom: social proof */}
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-2">
            {['\u{1F9D1}\u200D\u{1F393}', '\u{1F469}\u200D\u{1F3EB}', '\u{1F468}\u200D\u{1F4BB}', '\u{1F469}\u200D\u{1F52C}'].map((e, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border-2 border-primary-800 text-sm"
              >
                {e}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/50">
            <span className="text-white font-semibold">10,000+</span> users
            already learning
          </p>
        </div>
      </div>

      {/* ========== RIGHT — form panel ========== */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white text-lg font-bold">
              A
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Acadify
            </span>
          </Link>

          {/* heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to your account
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter your credentials to continue
            </p>
          </div>

          {/* google */}
          <button
            type="button"
            onClick={() => (window.location.href = '/api/auth/google')}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer mb-6"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          {/* divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <span className="relative mx-auto block w-fit bg-gray-50 dark:bg-dark-bg px-3 text-[11px] font-medium uppercase tracking-widest text-gray-400">
              or
            </span>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
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
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              value={formData.password}
              onChange={handleChange}
              icon={HiLockClosed}
              required
            />

            <div className="flex items-center justify-between pt-1">
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
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
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

          {/* footer link */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

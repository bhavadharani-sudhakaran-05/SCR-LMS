import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiLogin } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-6">

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden"
      >
        {/* header */}
        <div className="px-8 pt-10 pb-6 text-center border-b border-gray-100 dark:border-dark-border">
          <Link to="/">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white text-xl font-bold shadow-lg shadow-primary-500/25"
            >
              A
            </motion.div>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* body */}
        <div className="px-8 py-8 space-y-6">
          {/* google */}
          <button
            type="button"
            onClick={() => (window.location.href = '/api/auth/google')}
            className="w-full flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all cursor-pointer"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          {/* divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <span className="relative mx-auto block w-fit bg-white dark:bg-dark-card px-3 text-[11px] font-medium uppercase tracking-widest text-gray-400">
              or sign in with email
            </span>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex items-center justify-between">
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
        </div>

        {/* footer */}
        <div className="border-t border-gray-100 dark:border-dark-border bg-gray-50/60 dark:bg-gray-800/20 px-8 py-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

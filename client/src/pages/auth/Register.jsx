import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiUserAdd,
  HiArrowRight,
  HiArrowLeft,
  HiCheckCircle,
} from 'react-icons/hi';
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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (!formData.name.trim()) return toast.error('Please enter your name');
    if (!formData.email.trim()) return toast.error('Please enter your email');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return toast.error('Passwords do not match');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');
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
    { value: 'parent', label: 'Parent', emoji: '👨‍👩‍👧', desc: 'Track progress' },
  ];

  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-6">

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden"
      >
        {/* ---------- header ---------- */}
        <div className="px-8 pt-10 pb-6 text-center">
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
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {step === 1
              ? 'Pick a role and fill in your details'
              : 'Almost done — set your password'}
          </p>

          {/* step dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                step === 1 ? 'w-8 bg-primary-500' : 'w-4 bg-primary-200 dark:bg-primary-800'
              }`}
            />
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                step === 2 ? 'w-8 bg-primary-500' : 'w-4 bg-gray-200 dark:bg-gray-700'
              }`}
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-dark-border" />

        {/* ---------- body ---------- */}
        <div className="px-8 py-8">
          <AnimatePresence mode="wait">
            {/* ====== STEP 1 ====== */}
            {step === 1 ? (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* role selector */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    I am a&hellip;
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((r) => {
                      const active = formData.role === r.value;
                      return (
                        <motion.button
                          key={r.value}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            setFormData({ ...formData, role: r.value })
                          }
                          className={`relative flex flex-col items-center gap-1.5 rounded-xl py-4 border-2 transition-all duration-200 cursor-pointer
                            ${
                              active
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow shadow-primary-500/10'
                                : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50/60 dark:hover:bg-gray-800/40'
                            }`}
                        >
                          {active && (
                            <HiCheckCircle className="absolute top-2 right-2 h-4 w-4 text-primary-500" />
                          )}
                          <span className="text-2xl leading-none">{r.emoji}</span>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {r.label}
                          </span>
                          <span className="text-[10px] text-gray-400">{r.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* google */}
                <button
                  type="button"
                  onClick={() => (window.location.href = '/api/auth/google')}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all cursor-pointer"
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign up with Google
                </button>

                {/* or-divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <span className="relative mx-auto block w-fit bg-white dark:bg-dark-card px-3 text-[11px] font-medium uppercase tracking-widest text-gray-400">
                    or use email
                  </span>
                </div>

                {/* name + email */}
                <div className="space-y-5">
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
                </div>

                {/* continue */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={HiArrowRight}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </motion.div>
            ) : (
              /* ====== STEP 2 ====== */
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* user badge */}
                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold">
                      {formData.name.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {formData.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{formData.email}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-1 text-[11px] font-bold text-primary-600 dark:text-primary-400 capitalize">
                      {formData.role}
                    </span>
                  </div>

                  {/* passwords */}
                  <div className="space-y-5">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      icon={HiLockClosed}
                      required
                    />
                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      icon={HiLockClosed}
                      required
                    />
                  </div>

                  {/* actions */}
                  <div className="flex gap-3 pt-1">
                    <Button
                      variant="ghost"
                      size="lg"
                      icon={HiArrowLeft}
                      onClick={() => setStep(1)}
                      className="shrink-0"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      loading={loading}
                      icon={HiUserAdd}
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------- footer ---------- */}
        <div className="border-t border-gray-100 dark:border-dark-border bg-gray-50/60 dark:bg-gray-800/20 px-8 py-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

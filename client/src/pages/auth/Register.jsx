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
      toast.success('Account created successfully!');
      navigate(`/${data.user.role}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'student', label: 'Student', emoji: '\u{1F393}' },
    { value: 'teacher', label: 'Teacher', emoji: '\u{1F468}\u200D\u{1F3EB}' },
    { value: 'parent', label: 'Parent', emoji: '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}' },
  ];

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
            Start your<br />learning journey
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xs leading-relaxed">
            Join thousands of learners, teachers, and parents on a platform
            built for modern education.
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
              Create an account
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {step === 1
                ? 'Fill in your details to get started'
                : 'Set a password to secure your account'}
            </p>
          </div>

          {/* step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step >= s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= s
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400'
                  }`}
                >
                  {s === 1 ? 'Details' : 'Password'}
                </span>
                {s === 1 && (
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-2" />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ═══ STEP 1 ═══ */}
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* role pills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                    I am a
                  </label>
                  <div className="flex gap-2">
                    {roles.map((r) => {
                      const active = formData.role === r.value;
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, role: r.value })
                          }
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
                            ${
                              active
                                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                            }`}
                        >
                          <span className="text-base">{r.emoji}</span>
                          {r.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* google */}
                <button
                  type="button"
                  onClick={() => (window.location.href = '/api/auth/google')}
                  className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <FcGoogle className="h-5 w-5" />
                  Sign up with Google
                </button>

                {/* divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <span className="relative mx-auto block w-fit bg-gray-50 dark:bg-dark-bg px-3 text-[11px] font-medium uppercase tracking-widest text-gray-400">
                    or
                  </span>
                </div>

                {/* inputs */}
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
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={HiMail}
                  required
                />

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
              /* ═══ STEP 2 ═══ */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* summary chip */}
                  <div className="flex items-center gap-3 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white text-sm font-bold">
                      {formData.name.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {formData.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {formData.email}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 text-[11px] font-bold text-primary-600 dark:text-primary-400 capitalize">
                      {formData.role}
                    </span>
                  </div>

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

                  <div className="flex gap-3">
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

          {/* footer link */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

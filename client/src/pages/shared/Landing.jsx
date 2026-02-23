import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  HiAcademicCap, HiLightningBolt, HiChartBar, HiVideoCamera,
  HiChat, HiShieldCheck, HiCode, HiSparkles, HiStar,
  HiUserGroup, HiPuzzle, HiGlobe, HiCheck, HiArrowRight,
  HiMenu, HiX,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';

/* ───────────────────── animation helpers ───────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerChild = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
});

/* ───────────────── stable random positions (SSR-safe) ──────── */
const particlePositions = Array.from({ length: 15 }, (_, i) => ({
  left: `${(i * 7 + 3) % 100}%`,
  top: `${(i * 13 + 5) % 100}%`,
  dur: 4 + (i % 4),
  del: (i * 0.4) % 5,
}));

const ctaBubbles = Array.from({ length: 8 }, (_, i) => ({
  w: 80 + (i * 37) % 200,
  left: `${(i * 12 + 8) % 100}%`,
  top: `${(i * 17 + 4) % 100}%`,
  dur: 7 + (i % 5),
  del: (i * 0.6) % 4,
}));

/* ════════════════════════════════════════════════════════════════
   LANDING PAGE
   ════════════════════════════════════════════════════════════════ */
const Landing = () => {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* ── data ── */
  const features = useMemo(() => [
    { icon: HiSparkles, title: 'AI Tutor Bot', desc: '24/7 intelligent doubt-solving with personalized assistance', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-500/10' },
    { icon: HiPuzzle, title: 'Smart Quiz Gen', desc: 'Auto-create quizzes from notes, PDFs, or any content instantly', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10' },
    { icon: HiCode, title: 'AI Code Review', desc: 'Reviews and debugs student code for CS courses automatically', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10' },
    { icon: HiVideoCamera, title: 'HD Live Classes', desc: 'WebRTC-powered live video with whiteboard and screen sharing', color: 'from-red-500 to-orange-500', bg: 'bg-red-500/10' },
    { icon: HiChartBar, title: 'Smart Analytics', desc: 'Performance heatmaps, at-risk alerts, and predictive grading', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-500/10' },
    { icon: HiLightningBolt, title: 'Gamification', desc: 'XP points, leaderboards, skill trees, and 50+ badges to unlock', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-500/10' },
    { icon: HiShieldCheck, title: 'Anti-Cheat Proctoring', desc: 'Eye tracking, tab detection, and webcam monitoring built-in', color: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-500/10' },
    { icon: HiChat, title: 'Real-Time Chat', desc: 'Instant messaging, forums, anonymous doubt box, study rooms', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10' },
    { icon: HiGlobe, title: 'Knowledge Marketplace', desc: 'Students monetize their own study materials and earn rewards', color: 'from-fuchsia-500 to-pink-500', bg: 'bg-fuchsia-500/10' },
  ], []);

  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '500+', label: 'Courses' },
    { value: '50+', label: 'AI Features' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const roles = [
    {
      emoji: '🎓', title: 'Students',
      desc: 'Personalized AI learning paths, gamified progress, XP rewards, and smart study planning.',
      features: ['AI Tutor', 'Adaptive Quizzes', 'Skill Trees', 'Badges & XP'],
      accent: 'from-primary-500 to-primary-600',
    },
    {
      emoji: '👨‍🏫', title: 'Teachers',
      desc: 'AI-powered grading, quiz generation, student analytics, and live class tools.',
      features: ['Auto Grading', 'Quiz Builder', 'Analytics', 'Live Classes'],
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      emoji: '👨‍👩‍👧', title: 'Parents',
      desc: 'Real-time visibility into child progress, attendance, grades, and learning patterns.',
      features: ['Progress Tracking', 'Attendance', 'Alerts', 'Reports'],
      accent: 'from-amber-500 to-orange-500',
    },
    {
      emoji: '🏫', title: 'Admins',
      desc: 'Complete control over users, courses, fees, timetables, and institutional analytics.',
      features: ['User Management', 'Fee Tracking', 'Reports', 'Settings'],
      accent: 'from-pink-500 to-rose-500',
    },
  ];

  const dashCards = [
    { label: 'Courses', value: '12', color: 'bg-primary-500' },
    { label: 'XP Points', value: '4,250', color: 'bg-amber-500' },
    { label: 'Streak', value: '15 🔥', color: 'bg-orange-500' },
    { label: 'Level', value: '9', color: 'bg-emerald-500' },
  ];

  const barData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  /* ════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg overflow-x-hidden">

      {/* ━━━ NAVBAR ━━━ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-2xl shadow-lg shadow-black/[0.03] dark:shadow-black/20 border-b border-gray-200/60 dark:border-gray-700/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary-500/30"
              >
                A
              </motion.div>
              <span className="text-lg font-bold gradient-text">Acadrix</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Pricing', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50/60 dark:hover:bg-primary-900/20 transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <HiMenu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {['Features', 'Pricing', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-400/15 dark:bg-primary-400/10 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-400/15 dark:bg-accent-400/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-secondary-400/8 blur-[100px]" />

          {/* Floating particles */}
          {particlePositions.map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary-400/30"
              style={{ left: p.left, top: p.top }}
              animate={{ y: [0, -80], opacity: [0, 0.8, 0] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.del }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroParallax }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge pill */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200/70 dark:border-primary-700/50 px-4 py-1.5 rounded-full text-[13px] font-semibold text-primary-700 dark:text-primary-300 mb-6 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
              </span>
              AI-Powered Education Platform
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.08]">
              <span className="text-gray-900 dark:text-white">Learn Smarter</span>
              <br />
              <span className="gradient-text">with Acadrix</span>
            </h1>

            {/* Sub‑heading */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The next-generation Smart Classroom & LMS that combines AI tutoring,
              gamification, live classes, and analytics into one powerful platform.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={HiArrowRight}>
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" icon={HiVideoCamera}>
                  Watch Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Dashboard Preview ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 sm:mt-16 lg:mt-20 relative mx-auto max-w-5xl"
          >
            {/* Glow behind preview */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/10 to-primary-500/20 rounded-3xl blur-2xl opacity-60 dark:opacity-40 pointer-events-none" />

            {/* Fade-out at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg to-transparent z-10 rounded-b-2xl pointer-events-none" />

            <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700/60 shadow-2xl shadow-primary-500/[0.07] dark:shadow-black/30 overflow-hidden bg-gray-50 dark:bg-gray-800/80">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700/60">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-4 py-1 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                    acadrix.app/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  {dashCards.map((card) => (
                    <div
                      key={card.label}
                      className="bg-white dark:bg-gray-700/70 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-600/30"
                    >
                      <div className={`h-1 w-8 ${card.color} rounded-full mb-2.5`} />
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {card.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                        {card.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart + Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Chart */}
                  <div className="sm:col-span-2 bg-white dark:bg-gray-700/70 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600/30 h-40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Performance
                    </div>
                    <div className="flex items-end gap-1.5 h-24">
                      {barData.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: 0.7 + i * 0.04, duration: 0.45 }}
                          viewport={{ once: true }}
                          className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-sm min-w-0"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="bg-white dark:bg-gray-700/70 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600/30 h-40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Badges
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['🏆', '⚡', '🔥', '💎', '🎯', '🌟'].map((badge, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
                          viewport={{ once: true }}
                          className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-600/60 flex items-center justify-center text-lg border border-gray-100 dark:border-gray-500/30"
                        >
                          {badge}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━ FEATURES ━━━ */}
      <section id="features" className="py-20 sm:py-24 lg:py-28 bg-gray-50/80 dark:bg-dark-card/40 relative">
        {/* Top decorative line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mb-3">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Everything you need to{' '}
              <span className="gradient-text">learn smarter</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Powered by cutting-edge AI technology to transform how you learn, teach, and grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...staggerChild(i * 0.06)}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg shadow-${feature.color.split(' ')[0].replace('from-', '')}/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Subtle hover tint */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ROLES ━━━ */}
      <section className="py-20 sm:py-24 lg:py-28 relative">
        {/* Top decorative line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mb-3">
              For Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Tailored for every <span className="gradient-text">role</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Whether you're a student, teacher, parent, or administrator — Acadrix has you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                {...staggerChild(i * 0.1)}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 transition-all duration-300 flex flex-col"
              >
                {/* Emoji badge */}
                <div className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {role.emoji}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-1">
                  {role.desc}
                </p>

                <ul className="space-y-2">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <HiCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden isolate">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />

        {/* Mesh texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {/* Floating circles */}
        {ctaBubbles.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/[0.04]"
            style={{ width: b.w, height: b.w, left: b.left, top: b.top }}
            animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: b.dur, repeat: Infinity, delay: b.del, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight">
              Ready to transform
              <br className="hidden sm:block" /> your learning?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              Join thousands of students, teachers, and institutions already using
              Acadrix to revolutionize education.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/register">
                <Button variant="glass" size="lg" icon={HiArrowRight}>
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="lg">Sign In</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="bg-gray-900 dark:bg-dark-bg text-gray-400 border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                  A
                </div>
                <span className="text-lg font-bold text-white">Acadrix</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                AI-powered Smart Classroom & LMS for the next generation of learners.
              </p>
            </div>

            {/* Link columns */}
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/60 text-center text-sm text-gray-500">
            <p>© 2026 Acadrix. All rights reserved. Built with ❤️ for education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

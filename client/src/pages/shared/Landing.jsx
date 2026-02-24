import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiLightningBolt, HiChartBar, HiVideoCamera,
  HiChat, HiShieldCheck, HiCode, HiSparkles,
  HiPuzzle, HiGlobe, HiCheck, HiArrowRight,
  HiMenu, HiX,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';

/* ═══════════════════════════════════════════════════════════════
   LANDING  PAGE
   ═══════════════════════════════════════════════════════════════ */
const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── static data ── */
  const features = [
    { icon: HiSparkles, title: 'AI Tutor Bot', desc: '24/7 intelligent doubt-solving with personalized assistance', gradient: 'from-violet-500 to-purple-600' },
    { icon: HiPuzzle, title: 'Smart Quiz Gen', desc: 'Auto-create quizzes from notes, PDFs, or any content instantly', gradient: 'from-blue-500 to-cyan-500' },
    { icon: HiCode, title: 'AI Code Review', desc: 'Reviews and debugs student code for CS courses automatically', gradient: 'from-emerald-500 to-teal-500' },
    { icon: HiVideoCamera, title: 'HD Live Classes', desc: 'WebRTC-powered live video with whiteboard and screen sharing', gradient: 'from-red-500 to-orange-500' },
    { icon: HiChartBar, title: 'Smart Analytics', desc: 'Performance heatmaps, at-risk alerts, and predictive grading', gradient: 'from-pink-500 to-rose-500' },
    { icon: HiLightningBolt, title: 'Gamification', desc: 'XP points, leaderboards, skill trees, and 50+ badges to unlock', gradient: 'from-amber-500 to-yellow-500' },
    { icon: HiShieldCheck, title: 'Anti-Cheat Proctoring', desc: 'Eye tracking, tab detection, and webcam monitoring built-in', gradient: 'from-indigo-500 to-blue-600' },
    { icon: HiChat, title: 'Real-Time Chat', desc: 'Instant messaging, forums, anonymous doubt box, study rooms', gradient: 'from-cyan-500 to-blue-500' },
    { icon: HiGlobe, title: 'Knowledge Marketplace', desc: 'Students monetize their own study materials and earn rewards', gradient: 'from-fuchsia-500 to-pink-500' },
  ];

  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '500+', label: 'Courses' },
    { value: '50+', label: 'AI Features' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const roles = [
    { emoji: '🎓', title: 'Students', desc: 'Personalized AI learning paths, gamified progress, XP rewards, and smart study planning.', items: ['AI Tutor', 'Adaptive Quizzes', 'Skill Trees', 'Badges & XP'] },
    { emoji: '👨‍🏫', title: 'Teachers', desc: 'AI-powered grading, quiz generation, student analytics, and live class tools.', items: ['Auto Grading', 'Quiz Builder', 'Analytics', 'Live Classes'] },
    { emoji: '👨‍👩‍👧', title: 'Parents', desc: 'Real-time visibility into child progress, attendance, grades, and learning patterns.', items: ['Progress Tracking', 'Attendance', 'Alerts', 'Reports'] },
    { emoji: '🏫', title: 'Admins', desc: 'Complete control over users, courses, fees, timetables, and institutional analytics.', items: ['User Management', 'Fee Tracking', 'Reports', 'Settings'] },
  ];

  const dashCards = [
    { label: 'Courses', value: '12', clr: 'bg-primary-500' },
    { label: 'XP Points', value: '4,250', clr: 'bg-amber-500' },
    { label: 'Streak', value: '15 🔥', clr: 'bg-orange-500' },
    { label: 'Level', value: '9', clr: 'bg-emerald-500' },
  ];

  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  /* ═══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark-bg overflow-x-hidden">

      {/* ────────────── NAVBAR ────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] dark:shadow-black/30 border-b border-gray-200/50 dark:border-gray-700/50'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
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
              <span className="text-lg font-bold gradient-text select-none">Acadrix</span>
            </Link>

            {/* Desktop links */}
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
                <Button variant="primary" size="sm">Get Started Free</Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800"
            >
              <div className="px-6 py-4 space-y-1">
                {['Features', 'Pricing', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-center">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full justify-center">Get Started Free</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ────────────── HERO ────────────── */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-24">
        {/* BG blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-primary-400/20 dark:bg-primary-500/10 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-accent-400/20 dark:bg-accent-500/10 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200/60 dark:border-primary-700/50 px-5 py-2 rounded-full text-[13px] font-semibold text-primary-700 dark:text-primary-300 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary-400 opacity-75 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-primary-500" />
            </span>
            AI-Powered Education Platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            <span className="text-gray-900 dark:text-white">Learn Smarter</span>
            <br />
            <span className="gradient-text">with Acadrix</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            The next-generation Smart Classroom &amp; LMS that combines AI tutoring,
            gamification, live classes, and analytics into one powerful platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button variant="primary" size="lg" icon={HiArrowRight}>Start Learning Free</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" icon={HiVideoCamera}>Watch Demo</Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="text-center min-w-[100px]"
              >
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text leading-tight">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Dashboard mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 sm:mt-20 relative mx-auto max-w-5xl"
          >
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500/15 via-accent-500/10 to-primary-500/15 blur-2xl pointer-events-none" />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg to-transparent z-10 rounded-b-2xl pointer-events-none" />

            <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700/60 shadow-2xl shadow-gray-400/15 dark:shadow-black/40 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/60">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-4 py-0.5 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                    acadrix.app/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 sm:p-7 bg-white dark:bg-gray-800">
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                  {dashCards.map((c) => (
                    <div key={c.label} className="bg-gray-50 dark:bg-gray-700/60 rounded-xl p-4 border border-gray-100 dark:border-gray-600/40">
                      <div className={`h-1.5 w-10 ${c.clr} rounded-full mb-3`} />
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{c.value}</div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium">{c.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart + Badges row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Chart */}
                  <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-700/60 rounded-xl p-5 border border-gray-100 dark:border-gray-600/40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Performance</div>
                    <div className="flex items-end gap-1.5 sm:gap-2 h-24">
                      {bars.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: 0.6 + i * 0.035, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t min-w-0"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="bg-gray-50 dark:bg-gray-700/60 rounded-xl p-5 border border-gray-100 dark:border-gray-600/40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Badges</div>
                    <div className="grid grid-cols-3 gap-3 justify-items-center">
                      {['🏆', '⚡', '🔥', '💎', '🎯', '🌟'].map((b, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.07, type: 'spring', stiffness: 280, damping: 20 }}
                          viewport={{ once: true }}
                          className="h-11 w-11 rounded-xl bg-white dark:bg-gray-600/50 border border-gray-200 dark:border-gray-500/40 flex items-center justify-center text-xl shadow-sm"
                        >
                          {b}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────── FEATURES ────────────── */}
      <section id="features" className="relative py-20 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/40">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mb-3"
            >
              Features
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Everything you need to <span className="gradient-text">learn smarter</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Powered by cutting-edge AI technology to transform how you learn, teach, and grow.
            </motion.p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/30 transition-all duration-300"
              >
                <div className="p-7 sm:p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${f.gradient} text-white mb-5 shadow-lg`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── ROLES ────────────── */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-white dark:bg-dark-bg">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mb-3"
            >
              For Everyone
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Tailored for every <span className="gradient-text">role</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              Whether you're a student, teacher, parent, or administrator — Acadrix has you covered.
            </motion.p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/30 transition-all duration-300 flex flex-col"
              >
                <div className="p-7 sm:p-8 flex flex-col flex-1">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-3xl mb-5 shadow-sm">
                    {r.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                    {r.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <HiCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />

        <div className="relative w-full max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Ready to transform<br className="hidden sm:block" /> your learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
          >
            Join thousands of students, teachers, and institutions already using
            Acadrix to revolutionize education.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button
                variant="primary"
                size="lg"
                icon={HiArrowRight}
                className="!bg-white !text-primary-700 hover:!bg-gray-100 !shadow-xl !shadow-black/10 font-bold"
              >
                Get Started for Free
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="glass"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/15 backdrop-blur-sm"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 border-t border-gray-800/60">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                  A
                </div>
                <span className="text-lg font-bold text-white">Acadrix</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                AI-powered Smart Classroom &amp; LMS for the next generation of learners.
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'PRODUCT', links: ['Features', 'Pricing', 'API', 'Docs'] },
              { title: 'COMPANY', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'LEGAL', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/60 text-center text-sm text-gray-500">
            © 2026 Acadrix. All rights reserved. Built with ❤️ for education.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

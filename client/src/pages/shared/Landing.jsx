import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiLightningBolt, HiChartBar, HiVideoCamera,
  HiChat, HiShieldCheck, HiCode, HiSparkles,
  HiPuzzle, HiGlobe, HiCheck, HiArrowRight,
  HiMenu, HiX, HiAcademicCap, HiPlay,
  HiStar,
} from 'react-icons/hi';

/* ═══════════════════════════════════════════════════════════════
   LANDING  PAGE  —  CLEAN  REDESIGN
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Roles', href: '#roles' },
  ];

  const features = [
    { icon: HiSparkles,     title: 'AI Tutor Bot',          desc: '24/7 intelligent doubt-solving with personalized learning paths.',          color: 'text-violet-500',  bg: 'bg-violet-500/10  dark:bg-violet-500/15' },
    { icon: HiPuzzle,       title: 'Smart Quiz Gen',        desc: 'Auto-create quizzes from notes, PDFs, or any content instantly.',           color: 'text-blue-500',    bg: 'bg-blue-500/10    dark:bg-blue-500/15' },
    { icon: HiCode,         title: 'AI Code Review',        desc: 'Reviews and debugs student code for CS courses automatically.',             color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/15' },
    { icon: HiVideoCamera,  title: 'HD Live Classes',       desc: 'WebRTC-powered live video with whiteboard and screen sharing.',             color: 'text-rose-500',    bg: 'bg-rose-500/10    dark:bg-rose-500/15' },
    { icon: HiChartBar,     title: 'Smart Analytics',       desc: 'Performance heatmaps, at-risk alerts, and predictive grading.',             color: 'text-pink-500',    bg: 'bg-pink-500/10    dark:bg-pink-500/15' },
    { icon: HiLightningBolt,title: 'Gamification',          desc: 'XP points, leaderboards, skill trees, and 50+ badges to unlock.',           color: 'text-amber-500',   bg: 'bg-amber-500/10   dark:bg-amber-500/15' },
    { icon: HiShieldCheck,  title: 'Anti-Cheat Proctoring', desc: 'Eye tracking, tab detection, and webcam monitoring built-in.',              color: 'text-indigo-500',  bg: 'bg-indigo-500/10  dark:bg-indigo-500/15' },
    { icon: HiChat,         title: 'Real-Time Chat',        desc: 'Instant messaging, forums, anonymous doubt box, and study rooms.',          color: 'text-cyan-500',    bg: 'bg-cyan-500/10    dark:bg-cyan-500/15' },
    { icon: HiGlobe,        title: 'Knowledge Marketplace', desc: 'Students monetize their own study materials and earn rewards.',             color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15' },
  ];

  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '500+', label: 'Courses' },
    { value: '50+',  label: 'AI Features' },
    { value: '99%',  label: 'Satisfaction' },
  ];

  const steps = [
    { num: '01', title: 'Sign Up',        desc: 'Create your free account in seconds — no credit card needed.' },
    { num: '02', title: 'Explore Courses', desc: 'Browse hundreds of AI-curated courses across every subject.' },
    { num: '03', title: 'Learn & Earn XP', desc: 'Watch lessons, take quizzes, climb leaderboards, and earn badges.' },
    { num: '04', title: 'Track Progress',  desc: 'AI analytics show your strengths, gaps, and next steps.' },
  ];

  const roles = [
    { emoji: '🎓', title: 'Students',  desc: 'Personalized AI learning paths, gamified progress, XP rewards, and smart study planning.',             items: ['AI Tutor', 'Adaptive Quizzes', 'Skill Trees', 'Badges & XP'] },
    { emoji: '👨‍🏫', title: 'Teachers',  desc: 'AI-powered grading, quiz generation, student analytics, and live class tools.',                       items: ['Auto Grading', 'Quiz Builder', 'Analytics', 'Live Classes'] },
    { emoji: '👨‍👩‍👧', title: 'Parents',   desc: 'Real-time visibility into child progress, attendance, grades, and learning patterns.',                items: ['Progress Tracking', 'Attendance', 'Alerts', 'Reports'] },
    { emoji: '🏫', title: 'Admins',    desc: 'Complete control over users, courses, fees, timetables, and institutional analytics.',                items: ['User Management', 'Fee Tracking', 'Reports', 'Settings'] },
  ];

  const testimonials = [
    { name: 'Priya S.', role: 'Student', text: 'Acadrix helped me jump from a C to an A in just one semester. The AI tutor is like having a private teacher 24/7!', avatar: '🧑‍🎓' },
    { name: 'Rajesh K.', role: 'Teacher', text: 'Auto-grading saves me 10+ hours every week. I finally have time to focus on teaching rather than paperwork.', avatar: '👨‍🏫' },
    { name: 'Maria L.', role: 'Parent', text: 'I love being able to see my daughter\'s progress in real-time. The weekly reports give me total peace of mind.', avatar: '👩' },
  ];

  /* ═══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
            : ''
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-bold">A</div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-primary-600">Acad</span>rix
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 transition-colors"
            >
              Get Started <HiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2 text-gray-600 dark:text-gray-300" aria-label="Menu">
            {menuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
            >
              <div className="px-6 py-5 space-y-4">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300">
                    {l.label}
                  </a>
                ))}
                <hr className="border-gray-200 dark:border-gray-800" />
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300">Sign in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block w-full text-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative isolate pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36">
        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_40%,black_40%,transparent_100%)] opacity-60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary-400/20 dark:bg-primary-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Pill */}
          <motion.div {...fadeUp(0)} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/60 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300">
            <HiAcademicCap className="h-4 w-4" /> AI-Powered Education Platform
          </motion.div>

          {/* Heading */}
          <motion.h1 {...fadeUp(0.05)} className="text-[2.5rem] leading-[1.1] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            The Smarter Way
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-violet-500 to-accent-500 bg-clip-text text-transparent">to Learn &amp; Teach</span>
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.1)} className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            Acadrix combines AI tutoring, gamification, live classes, and deep analytics
            into one beautiful platform — for students, teachers, parents &amp; admins.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Learning Free <HiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 px-7 py-3.5 text-[15px] font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              <HiPlay className="h-4 w-4" /> Watch Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.25)} className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-20">
            <motion.p {...fadeUp(0)} className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-3">Features</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Everything you need to <span className="text-primary-600 dark:text-primary-400">succeed</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Powered by cutting-edge AI to transform how you learn, teach, and grow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.03)}
                className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-7 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${f.bg} ${f.color} mb-5`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-20">
            <motion.p {...fadeUp(0)} className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-3">How it works</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Get started in <span className="text-primary-600 dark:text-primary-400">4 easy steps</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.08)} className="relative text-center lg:text-left">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-600 text-white text-xl font-extrabold mb-5 shadow-lg shadow-primary-600/20">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%-8px)] w-[calc(100%-56px)] border-t-2 border-dashed border-gray-300 dark:border-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROLES ─── */}
      <section id="roles" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-20">
            <motion.p {...fadeUp(0)} className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-3">For Everyone</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Built for every <span className="text-primary-600 dark:text-primary-400">role</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Whether you're a student, teacher, parent, or admin — Acadrix has you covered.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                {...fadeUp(i * 0.08)}
                className="flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-4xl mb-4 block">{r.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{r.title}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">{r.desc}</p>
                  <ul className="space-y-2.5 border-t border-gray-100 dark:border-gray-800 pt-5">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14px] text-gray-600 dark:text-gray-300">
                        <HiCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-20">
            <motion.p {...fadeUp(0)} className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Loved by <span className="text-primary-600 dark:text-primary-400">thousands</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp(i * 0.08)}
                className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <HiStar key={j} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-xl">{t.avatar}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="relative overflow-hidden rounded-3xl bg-primary-600 px-8 py-16 sm:px-16 sm:py-20 text-center"
          >
            {/* Pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to transform<br className="hidden sm:block" /> your learning?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-primary-100/90 leading-relaxed">
                Join thousands of students, teachers, and institutions already
                using Acadrix to revolutionize education.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-bold text-primary-700 shadow-xl shadow-black/10 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get Started for Free <HiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-bold">A</div>
                <span className="text-lg font-extrabold tracking-tight">
                  <span className="text-primary-600">Acad</span>rix
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                AI-powered Smart Classroom &amp; LMS for the next generation of learners.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400 dark:text-gray-500">
            © 2026 Acadrix. All rights reserved. Built with ❤️ for education.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

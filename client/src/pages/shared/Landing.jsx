import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiLightningBolt, HiChartBar, HiVideoCamera,
  HiChat, HiShieldCheck, HiCode, HiSparkles,
  HiPuzzle, HiGlobe, HiCheck, HiArrowRight,
  HiMenu, HiX, HiAcademicCap, HiPlay, HiStar,
} from 'react-icons/hi';

/* ────────────────────────────────────────────────────────
   Wrapper — guarantees centered content with safe padding
   using inline styles so Tailwind class issues can't break it
   ──────────────────────────────────────────────────────── */
const Wrap = ({ children, className = '', narrow = false, style = {} }) => (
  <div
    style={{
      width: '100%',
      maxWidth: narrow ? 720 : 1140,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 40,
      paddingRight: 40,
      boxSizing: 'border-box',
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
);

/* simple fade-in */
const anim = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, delay: d, ease: 'easeOut' },
});

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Roles', href: '#roles' },
];

const STATS = [
  { val: '10K+', label: 'Active Students' },
  { val: '500+', label: 'Courses' },
  { val: '50+', label: 'AI Features' },
  { val: '99%', label: 'Satisfaction' },
];

const FEATURES = [
  { icon: HiSparkles, title: 'AI Tutor Bot', desc: '24/7 intelligent doubt-solving with personalized learning paths.', accent: '#8b5cf6' },
  { icon: HiPuzzle, title: 'Smart Quiz Gen', desc: 'Auto-create quizzes from notes, PDFs, or any content instantly.', accent: '#3b82f6' },
  { icon: HiCode, title: 'AI Code Review', desc: 'Reviews and debugs student code for CS courses automatically.', accent: '#10b981' },
  { icon: HiVideoCamera, title: 'HD Live Classes', desc: 'WebRTC-powered live video with whiteboard and screen sharing.', accent: '#f43f5e' },
  { icon: HiChartBar, title: 'Smart Analytics', desc: 'Performance heatmaps, at-risk alerts, and predictive grading.', accent: '#ec4899' },
  { icon: HiLightningBolt, title: 'Gamification', desc: 'XP points, leaderboards, skill trees, and 50+ badges to unlock.', accent: '#f59e0b' },
  { icon: HiShieldCheck, title: 'Anti-Cheat Proctoring', desc: 'Eye tracking, tab detection, and webcam monitoring built-in.', accent: '#6366f1' },
  { icon: HiChat, title: 'Real-Time Chat', desc: 'Instant messaging, forums, anonymous doubt box, and study rooms.', accent: '#06b6d4' },
  { icon: HiGlobe, title: 'Knowledge Marketplace', desc: 'Students monetize their own study materials and earn rewards.', accent: '#d946ef' },
];

const STEPS = [
  { n: '01', title: 'Sign Up', desc: 'Create your free account in seconds — no credit card needed.' },
  { n: '02', title: 'Explore Courses', desc: 'Browse hundreds of AI-curated courses across every subject.' },
  { n: '03', title: 'Learn & Earn XP', desc: 'Watch lessons, take quizzes, climb leaderboards, and earn badges.' },
  { n: '04', title: 'Track Progress', desc: 'AI analytics show your strengths, gaps, and next steps.' },
];

const ROLES = [
  { emoji: '🎓', title: 'Students', desc: 'Personalized AI learning paths, gamified progress, XP rewards, and smart study planning.', items: ['AI Tutor', 'Adaptive Quizzes', 'Skill Trees', 'Badges & XP'] },
  { emoji: '👨‍🏫', title: 'Teachers', desc: 'AI-powered grading, quiz generation, student analytics, and live class tools.', items: ['Auto Grading', 'Quiz Builder', 'Analytics', 'Live Classes'] },
  { emoji: '👨‍👩‍👧', title: 'Parents', desc: 'Real-time visibility into child progress, attendance, grades, and learning patterns.', items: ['Progress Tracking', 'Attendance', 'Alerts', 'Reports'] },
  { emoji: '🏫', title: 'Admins', desc: 'Complete control over users, courses, fees, timetables, and institutional analytics.', items: ['User Management', 'Fee Tracking', 'Reports', 'Settings'] },
];

const REVIEWS = [
  { name: 'Priya S.', role: 'Student', text: 'Acadrix helped me jump from a C to an A in just one semester. The AI tutor is like having a private teacher 24/7!', avatar: '🧑‍🎓' },
  { name: 'Rajesh K.', role: 'Teacher', text: 'Auto-grading saves me 10+ hours every week. I finally have time to focus on teaching rather than paperwork.', avatar: '👨‍🏫' },
  { name: 'Maria L.', role: 'Parent', text: "I love being able to see my daughter's progress in real-time. The weekly reports give me total peace of mind.", avatar: '👩' },
];

/* ════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════ */
const Landing = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
      className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
    >
      {/* ═══════════ NAVBAR ═══════════ */}
      <header
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .3s' }}
        className={scrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm' : ''}
      >
        <Wrap>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <span
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: '#4f46e5', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                }}
              >
                A
              </span>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }} className="text-gray-900 dark:text-white">
                <span style={{ color: '#4f46e5' }}>Acad</span>rix
              </span>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
              {NAV.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Desktop actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden md:flex">
              <Link
                to="/login"
                style={{ fontSize: 14, fontWeight: 500, padding: '6px 12px', textDecoration: 'none', transition: 'color .2s' }}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 600, padding: '8px 18px',
                  borderRadius: 8, background: '#4f46e5', color: '#fff',
                  textDecoration: 'none', transition: 'background .2s',
                }}
              >
                Get Started <HiArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
              className="md:hidden text-gray-600 dark:text-gray-300"
              aria-label="Menu"
            >
              {open ? <HiX style={{ width: 24, height: 24 }} /> : <HiMenu style={{ width: 24, height: 24 }} />}
            </button>
          </div>
        </Wrap>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <Wrap style={{ paddingTop: 20, paddingBottom: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {NAV.map((l) => (
                    <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: 16, fontWeight: 500, textDecoration: 'none' }} className="text-gray-700 dark:text-gray-300">{l.label}</a>
                  ))}
                  <hr className="border-gray-200 dark:border-gray-800" style={{ margin: '4px 0' }} />
                  <Link to="/login" onClick={() => setOpen(false)} style={{ fontSize: 16, fontWeight: 500, textDecoration: 'none' }} className="text-gray-700 dark:text-gray-300">Sign in</Link>
                  <Link to="/register" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center', padding: '10px 16px', borderRadius: 8, background: '#4f46e5', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                    Get Started Free
                  </Link>
                </div>
              </Wrap>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        {/* Soft glow — contained */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Wrap narrow style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div {...anim(0)} style={{ marginBottom: 28 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                border: '1px solid', letterSpacing: '0.02em',
              }}
              className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950/50 dark:text-primary-300"
            >
              <HiAcademicCap style={{ width: 16, height: 16 }} /> AI-Powered Education Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...anim(0.05)}
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}
          >
            The Smarter Way
            <br />
            <span style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              to Learn &amp; Teach
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...anim(0.1)}
            style={{ margin: '24px auto 0', maxWidth: 540, fontSize: 17, lineHeight: 1.7 }}
            className="text-gray-500 dark:text-gray-400"
          >
            Acadrix combines AI tutoring, gamification, live classes, and deep analytics
            into one beautiful platform — for students, teachers, parents &amp; admins.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...anim(0.15)} style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link
              to="/register"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                background: '#4f46e5', color: '#fff', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(79,70,229,0.3)', transition: 'transform .2s, background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Start Learning Free <HiArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              to="/login"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                textDecoration: 'none', transition: 'transform .2s',
                border: '2px solid',
              }}
              className="border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <HiPlay style={{ width: 16, height: 16 }} /> Watch Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...anim(0.25)}
            style={{
              marginTop: 64, display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center',
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }} className="text-gray-900 dark:text-white">{s.val}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }} className="text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </Wrap>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" style={{ paddingTop: 80, paddingBottom: 80 }} className="bg-gray-50 dark:bg-gray-900/60">
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.p {...anim(0)} style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }} className="text-primary-600 dark:text-primary-400">
              Features
            </motion.p>
            <motion.h2 {...anim(0.05)} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Everything you need to{' '}
              <span className="text-primary-600 dark:text-primary-400">succeed</span>
            </motion.h2>
            <motion.p {...anim(0.1)} style={{ margin: '14px auto 0', maxWidth: 480, fontSize: 16, lineHeight: 1.6 }} className="text-gray-500 dark:text-gray-400">
              Powered by cutting-edge AI to transform how you learn, teach, and grow.
            </motion.p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 20,
            }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...anim(i * 0.03)}
                style={{
                  padding: 28, borderRadius: 16,
                  border: '1px solid', transition: 'box-shadow .3s, border-color .3s',
                }}
                className="border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20"
              >
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                    background: `${f.accent}18`, color: f.accent,
                  }}
                >
                  <f.icon style={{ width: 22, height: 22 }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }} className="text-gray-900 dark:text-white">{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }} className="text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.p {...anim(0)} style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }} className="text-primary-600 dark:text-primary-400">
              How it works
            </motion.p>
            <motion.h2 {...anim(0.05)} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Get started in{' '}
              <span className="text-primary-600 dark:text-primary-400">4 easy steps</span>
            </motion.h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
              gap: 32,
            }}
          >
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...anim(i * 0.08)} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: '#4f46e5', color: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 800, marginBottom: 18,
                    boxShadow: '0 4px 12px rgba(79,70,229,0.25)',
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }} className="text-gray-900 dark:text-white">{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }} className="text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ═══════════ ROLES ═══════════ */}
      <section id="roles" style={{ paddingTop: 80, paddingBottom: 80 }} className="bg-gray-50 dark:bg-gray-900/60">
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.p {...anim(0)} style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }} className="text-primary-600 dark:text-primary-400">
              For Everyone
            </motion.p>
            <motion.h2 {...anim(0.05)} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Built for every{' '}
              <span className="text-primary-600 dark:text-primary-400">role</span>
            </motion.h2>
            <motion.p {...anim(0.1)} style={{ margin: '14px auto 0', maxWidth: 480, fontSize: 16, lineHeight: 1.6 }} className="text-gray-500 dark:text-gray-400">
              Whether you're a student, teacher, parent, or admin — Acadrix has you covered.
            </motion.p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
              gap: 20,
            }}
          >
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                {...anim(i * 0.08)}
                style={{
                  borderRadius: 16, overflow: 'hidden',
                  border: '1px solid', display: 'flex', flexDirection: 'column',
                  transition: 'box-shadow .3s',
                }}
                className="border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 hover:shadow-lg"
              >
                <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 36, marginBottom: 14, display: 'block' }}>{r.emoji}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }} className="text-gray-900 dark:text-white">{r.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, flex: 1 }} className="text-gray-500 dark:text-gray-400">{r.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid', paddingTop: 18 }} className="border-gray-100 dark:border-gray-800">
                    {r.items.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }} className="text-gray-600 dark:text-gray-300">
                        <HiCheck style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <Wrap>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.p {...anim(0)} style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }} className="text-primary-600 dark:text-primary-400">
              Testimonials
            </motion.p>
            <motion.h2 {...anim(0.05)} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Loved by{' '}
              <span className="text-primary-600 dark:text-primary-400">thousands</span>
            </motion.h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: 20,
            }}
          >
            {REVIEWS.map((t, i) => (
              <motion.div
                key={t.name}
                {...anim(i * 0.08)}
                style={{ padding: 28, borderRadius: 16, border: '1px solid' }}
                className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <HiStar key={j} style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  ))}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 22 }} className="text-gray-600 dark:text-gray-300">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}
                    className="bg-primary-100 dark:bg-primary-900/40"
                  >
                    {t.avatar}
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }} className="text-gray-900 dark:text-white">{t.name}</div>
                    <div style={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Wrap>
          <motion.div
            {...anim(0)}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: 24, background: '#4f46e5',
              padding: '64px 40px', textAlign: 'center',
            }}
          >
            {/* dot pattern */}
            <div
              style={{
                position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
                Ready to transform<br />your learning?
              </h2>
              <p style={{ margin: '18px auto 0', maxWidth: 480, fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                Join thousands of students, teachers, and institutions already
                using Acadrix to revolutionize education.
              </p>
              <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                    background: '#fff', color: '#4338ca', textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)', transition: 'transform .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Get Started for Free <HiArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                    background: 'transparent', color: '#fff', textDecoration: 'none',
                    border: '2px solid rgba(255,255,255,0.3)', transition: 'transform .2s, background .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </Wrap>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ borderTop: '1px solid' }} className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Wrap style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
              gap: 40,
            }}
          >
            {/* Brand */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: '#4f46e5', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700,
                  }}
                >
                  A
                </span>
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }} className="text-gray-900 dark:text-white">
                  <span style={{ color: '#4f46e5' }}>Acad</span>rix
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 260 }} className="text-gray-500 dark:text-gray-400">
                AI-powered Smart Classroom &amp; LMS for the next generation of learners.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }} className="text-gray-900 dark:text-white">
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontSize: 14, textDecoration: 'none', transition: 'color .2s' }} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid', textAlign: 'center', fontSize: 13 }} className="border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500">
            &copy; 2026 Acadrix. All rights reserved. Built with ❤️ for education.
          </div>
        </Wrap>
      </footer>
    </div>
  );
};

export default Landing;

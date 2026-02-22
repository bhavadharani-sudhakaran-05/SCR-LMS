import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HiAcademicCap, HiLightningBolt, HiChartBar, HiVideoCamera,
  HiChat, HiShieldCheck, HiCode, HiSparkles, HiStar,
  HiUserGroup, HiPuzzle, HiGlobe, HiCheck, HiArrowRight,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const features = [
    { icon: HiSparkles, title: 'AI Tutor Bot', desc: '24/7 intelligent doubt-solving with personalized assistance', color: 'from-violet-500 to-purple-600' },
    { icon: HiPuzzle, title: 'Smart Quiz Gen', desc: 'Auto-create quizzes from notes, PDFs, or any content instantly', color: 'from-blue-500 to-cyan-500' },
    { icon: HiCode, title: 'AI Code Review', desc: 'Reviews and debugs student code for CS courses automatically', color: 'from-emerald-500 to-teal-500' },
    { icon: HiVideoCamera, title: 'HD Live Classes', desc: 'WebRTC-powered live video with whiteboard and screen sharing', color: 'from-orange-500 to-red-500' },
    { icon: HiChartBar, title: 'Smart Analytics', desc: 'Performance heatmaps, at-risk alerts, and predictive grading', color: 'from-pink-500 to-rose-500' },
    { icon: HiLightningBolt, title: 'Gamification', desc: 'XP points, leaderboards, skill trees, and 50+ badges to unlock', color: 'from-amber-500 to-yellow-500' },
    { icon: HiShieldCheck, title: 'Anti-Cheat Proctoring', desc: 'Eye tracking, tab detection, and webcam monitoring built-in', color: 'from-indigo-500 to-blue-600' },
    { icon: HiChat, title: 'Real-Time Chat', desc: 'Instant messaging, forums, anonymous doubt box, study rooms', color: 'from-cyan-500 to-blue-500' },
    { icon: HiGlobe, title: 'Knowledge Marketplace', desc: 'Students monetize their own study materials and earn rewards', color: 'from-fuchsia-500 to-pink-500' },
  ];

  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '500+', label: 'Courses' },
    { value: '50+', label: 'AI Features' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const roles = [
    {
      emoji: '🎓',
      title: 'Students',
      desc: 'Personalized AI learning paths, gamified progress, XP rewards, and smart study planning.',
      features: ['AI Tutor', 'Adaptive Quizzes', 'Skill Trees', 'Badges & XP'],
    },
    {
      emoji: '👨‍🏫',
      title: 'Teachers',
      desc: 'AI-powered grading, quiz generation, student analytics, and live class tools.',
      features: ['Auto Grading', 'Quiz Builder', 'Analytics', 'Live Classes'],
    },
    {
      emoji: '👨‍👩‍👧',
      title: 'Parents',
      desc: 'Real-time visibility into child progress, attendance, grades, and learning patterns.',
      features: ['Progress Tracking', 'Attendance', 'Alerts', 'Reports'],
    },
    {
      emoji: '🏫',
      title: 'Admins',
      desc: 'Complete control over users, courses, fees, timetables, and institutional analytics.',
      features: ['User Management', 'Fee Tracking', 'Reports', 'Settings'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-lg"
            >
              A
            </motion.div>
            <span className="text-xl font-bold gradient-text">Acadrix</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-secondary-400/10 blur-3xl" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 px-4 py-2 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              AI-Powered Education Platform
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="text-gray-900 dark:text-white">Learn Smarter</span>
              <br />
              <span className="gradient-text">with Acadrix</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The next-generation Smart Classroom & LMS that combines AI tutoring,
              gamification, live classes, and analytics into one powerful platform.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="xl" icon={HiArrowRight}>
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" icon={HiVideoCamera}>
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-bg to-transparent z-10 h-32 bottom-0 top-auto" />
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-primary-500/10 overflow-hidden bg-gray-100 dark:bg-gray-800 mx-auto max-w-5xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-1 text-xs text-gray-500">
                    acadrix.app/dashboard
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[
                    { label: 'Courses', value: '12', color: 'bg-primary-500' },
                    { label: 'XP Points', value: '4,250', color: 'bg-amber-500' },
                    { label: 'Streak', value: '15 🔥', color: 'bg-orange-500' },
                    { label: 'Level', value: '9', color: 'bg-emerald-500' },
                  ].map((card) => (
                    <div key={card.label} className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm">
                      <div className={`h-1 w-8 ${card.color} rounded-full mb-3`} />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{card.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm h-40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance</div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm h-40">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Badges</div>
                    <div className="grid grid-cols-3 gap-2">
                      {['🏆', '⚡', '🔥', '💎', '🎯', '🌟'].map((badge, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                          viewport={{ once: true }}
                          className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-600 flex items-center justify-center text-lg"
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
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-dark-card/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              Features
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Everything you need to{' '}
              <span className="gradient-text">learn smarter</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powered by cutting-edge AI technology to transform how you learn, teach, and grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...stagger}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              For Everyone
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Tailored for every <span className="gradient-text">role</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                {...stagger}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{role.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
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

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600" />
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to transform your learning?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of students, teachers, and institutions already using
              Acadrix to revolutionize education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="glass" size="xl" icon={HiArrowRight}>
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-dark-bg text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-xl font-bold text-white">Acadrix</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered Smart Classroom & LMS for the next generation of learners.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'API', 'Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2026 Acadrix. All rights reserved. Built with ❤️ for education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiCog, HiGlobe, HiMail, HiShieldCheck,
  HiBell, HiSave, HiCheck,
} from 'react-icons/hi';
import toast from 'react-hot-toast';

/* ── tiny reusable toggle ── */
const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
      enabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
        enabled ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

/* ── field wrapper ── */
const Field = ({ label, children, className = '' }) => (
  <div className={className}>
    {label && (
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    {children}
  </div>
);

/* ── styled text input ── */
const SettingsInput = ({ label, className = '', ...props }) => (
  <Field label={label} className={className}>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400/20"
    />
  </Field>
);

/* ── toggle row ── */
const ToggleRow = ({ label, desc, enabled, onChange }) => (
  <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-800/40">
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
      {desc && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{desc}</p>}
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

/* ── section card ── */
const Section = ({ icon: Icon, title, color, delay = 0, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    {/* header */}
    <div className={`flex items-center gap-3 bg-gradient-to-r ${color} px-6 py-4`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
        <Icon className="h-4.5 w-4.5 text-white" />
      </div>
      <h2 className="text-base font-semibold text-white">{title}</h2>
    </div>
    {/* body */}
    <div className="p-6 space-y-4">{children}</div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   SETTINGS PAGE
   ═══════════════════════════════════════════════════════════ */
const Settings = () => {
  const [general, setGeneral] = useState({
    siteName: 'Acadrix',
    tagline: 'AI-Powered Smart Classroom & LMS',
    maxUpload: '50',
    maintenanceMode: false,
  });

  const [smtp, setSmtp] = useState({
    host: '',
    port: '587',
    user: '',
    password: '',
    from: 'noreply@acadrix.com',
  });

  const [security, setSecurity] = useState({
    maxLoginAttempts: '5',
    sessionTimeout: '30',
    enforce2FA: false,
    minPasswordLength: '8',
  });

  const [notif, setNotif] = useState({
    emailNotifications: true,
    enrollmentAlerts: true,
    submissionAlerts: true,
    systemAlerts: true,
  });

  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Platform Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure your Acadrix instance
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          <HiSave className="h-4 w-4" />
          Save All Changes
        </button>
      </motion.div>

      {/* ── Sections (2-col on large screens) ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── General ── */}
        <Section icon={HiGlobe} title="General Settings" color="from-blue-500 to-indigo-500" delay={0}>
          <SettingsInput
            label="Site Name"
            value={general.siteName}
            onChange={(e) => setGeneral((p) => ({ ...p, siteName: e.target.value }))}
          />
          <SettingsInput
            label="Tagline"
            value={general.tagline}
            onChange={(e) => setGeneral((p) => ({ ...p, tagline: e.target.value }))}
          />
          <SettingsInput
            label="Max Upload Size (MB)"
            type="number"
            value={general.maxUpload}
            onChange={(e) => setGeneral((p) => ({ ...p, maxUpload: e.target.value }))}
          />
          <ToggleRow
            label="Maintenance Mode"
            desc="Temporarily disable access for non-admins"
            enabled={general.maintenanceMode}
            onChange={() => setGeneral((p) => ({ ...p, maintenanceMode: !p.maintenanceMode }))}
          />
        </Section>

        {/* ── SMTP ── */}
        <Section icon={HiMail} title="Email / SMTP" color="from-emerald-500 to-teal-500" delay={0.08}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SettingsInput
              label="SMTP Host"
              placeholder="smtp.gmail.com"
              value={smtp.host}
              onChange={(e) => setSmtp((p) => ({ ...p, host: e.target.value }))}
            />
            <SettingsInput
              label="Port"
              type="number"
              value={smtp.port}
              onChange={(e) => setSmtp((p) => ({ ...p, port: e.target.value }))}
            />
          </div>
          <SettingsInput
            label="Username"
            value={smtp.user}
            onChange={(e) => setSmtp((p) => ({ ...p, user: e.target.value }))}
          />
          <SettingsInput
            label="Password"
            type="password"
            value={smtp.password}
            onChange={(e) => setSmtp((p) => ({ ...p, password: e.target.value }))}
          />
          <SettingsInput
            label="From Email"
            value={smtp.from}
            onChange={(e) => setSmtp((p) => ({ ...p, from: e.target.value }))}
          />
        </Section>

        {/* ── Security ── */}
        <Section icon={HiShieldCheck} title="Security" color="from-red-500 to-orange-500" delay={0.16}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SettingsInput
              label="Max Login Attempts"
              type="number"
              value={security.maxLoginAttempts}
              onChange={(e) => setSecurity((p) => ({ ...p, maxLoginAttempts: e.target.value }))}
            />
            <SettingsInput
              label="Session Timeout (min)"
              type="number"
              value={security.sessionTimeout}
              onChange={(e) => setSecurity((p) => ({ ...p, sessionTimeout: e.target.value }))}
            />
          </div>
          <SettingsInput
            label="Min Password Length"
            type="number"
            value={security.minPasswordLength}
            onChange={(e) => setSecurity((p) => ({ ...p, minPasswordLength: e.target.value }))}
          />
          <ToggleRow
            label="Enforce 2FA"
            desc="Require two-factor authentication for all users"
            enabled={security.enforce2FA}
            onChange={() => setSecurity((p) => ({ ...p, enforce2FA: !p.enforce2FA }))}
          />
        </Section>

        {/* ── Notifications ── */}
        <Section icon={HiBell} title="Notifications" color="from-purple-500 to-pink-500" delay={0.24}>
          <ToggleRow
            label="Email Notifications"
            desc="Send email for important events"
            enabled={notif.emailNotifications}
            onChange={() => setNotif((p) => ({ ...p, emailNotifications: !p.emailNotifications }))}
          />
          <ToggleRow
            label="Enrollment Alerts"
            desc="Notify when students enroll"
            enabled={notif.enrollmentAlerts}
            onChange={() => setNotif((p) => ({ ...p, enrollmentAlerts: !p.enrollmentAlerts }))}
          />
          <ToggleRow
            label="Submission Alerts"
            desc="Notify teachers of new submissions"
            enabled={notif.submissionAlerts}
            onChange={() => setNotif((p) => ({ ...p, submissionAlerts: !p.submissionAlerts }))}
          />
          <ToggleRow
            label="System Alerts"
            desc="Critical system notifications"
            enabled={notif.systemAlerts}
            onChange={() => setNotif((p) => ({ ...p, systemAlerts: !p.systemAlerts }))}
          />
        </Section>
      </div>
    </div>
  );
};

export default Settings;

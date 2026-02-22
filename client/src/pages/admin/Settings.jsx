import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCog, HiGlobe, HiMail, HiShieldCheck, HiColorSwatch, HiBell, HiSave, HiRefresh } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Settings = () => {
  const [general, setGeneral] = useState({ siteName: 'Acadrix', tagline: 'AI-Powered Smart Classroom & LMS', maxUpload: '50', maintenanceMode: false });
  const [smtp, setSmtp] = useState({ host: '', port: '587', user: '', password: '', from: 'noreply@acadrix.com' });
  const [security, setSecurity] = useState({ maxLoginAttempts: '5', sessionTimeout: '30', enforce2FA: false, minPasswordLength: '8' });
  const [notif, setNotif] = useState({ emailNotifications: true, enrollmentAlerts: true, submissionAlerts: true, systemAlerts: true });

  const sections = [
    {
      id: 'general', title: 'General Settings', icon: HiGlobe, color: 'from-blue-500 to-indigo-500',
      content: (
        <div className="space-y-4">
          <Input label="Site Name" value={general.siteName} onChange={e => setGeneral(p => ({ ...p, siteName: e.target.value }))} />
          <Input label="Tagline" value={general.tagline} onChange={e => setGeneral(p => ({ ...p, tagline: e.target.value }))} />
          <Input label="Max Upload Size (MB)" type="number" value={general.maxUpload} onChange={e => setGeneral(p => ({ ...p, maxUpload: e.target.value }))} />
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
              <p className="text-xs text-gray-500">Temporarily disable access for non-admins</p>
            </div>
            <button onClick={() => setGeneral(p => ({ ...p, maintenanceMode: !p.maintenanceMode }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${general.maintenanceMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${general.maintenanceMode ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'smtp', title: 'Email / SMTP', icon: HiMail, color: 'from-emerald-500 to-teal-500',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="SMTP Host" placeholder="smtp.gmail.com" value={smtp.host} onChange={e => setSmtp(p => ({ ...p, host: e.target.value }))} />
            <Input label="Port" type="number" value={smtp.port} onChange={e => setSmtp(p => ({ ...p, port: e.target.value }))} />
          </div>
          <Input label="Username" value={smtp.user} onChange={e => setSmtp(p => ({ ...p, user: e.target.value }))} />
          <Input label="Password" type="password" value={smtp.password} onChange={e => setSmtp(p => ({ ...p, password: e.target.value }))} />
          <Input label="From Email" value={smtp.from} onChange={e => setSmtp(p => ({ ...p, from: e.target.value }))} />
        </div>
      )
    },
    {
      id: 'security', title: 'Security', icon: HiShieldCheck, color: 'from-red-500 to-orange-500',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Max Login Attempts" type="number" value={security.maxLoginAttempts} onChange={e => setSecurity(p => ({ ...p, maxLoginAttempts: e.target.value }))} />
            <Input label="Session Timeout (min)" type="number" value={security.sessionTimeout} onChange={e => setSecurity(p => ({ ...p, sessionTimeout: e.target.value }))} />
          </div>
          <Input label="Min Password Length" type="number" value={security.minPasswordLength} onChange={e => setSecurity(p => ({ ...p, minPasswordLength: e.target.value }))} />
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Enforce 2FA</p>
              <p className="text-xs text-gray-500">Require two-factor authentication for all users</p>
            </div>
            <button onClick={() => setSecurity(p => ({ ...p, enforce2FA: !p.enforce2FA }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${security.enforce2FA ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${security.enforce2FA ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'notif', title: 'Notifications', icon: HiBell, color: 'from-purple-500 to-pink-500',
      content: (
        <div className="space-y-3">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send email for important events' },
            { key: 'enrollmentAlerts', label: 'Enrollment Alerts', desc: 'Notify when students enroll' },
            { key: 'submissionAlerts', label: 'Submission Alerts', desc: 'Notify teachers of new submissions' },
            { key: 'systemAlerts', label: 'System Alerts', desc: 'Critical system notifications' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button onClick={() => setNotif(p => ({ ...p, [item.key]: !p[item.key] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${notif[item.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${notif[item.key] ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      )
    }
  ];

  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="text-gray-500 mt-1">Configure your Acadrix instance</p>
        </div>
        <Button variant="primary" icon={HiSave} onClick={handleSave}>Save All Changes</Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="overflow-hidden h-full">
              <div className={`bg-gradient-to-r ${section.color} p-4 flex items-center gap-3`}>
                <section.icon className="h-6 w-6 text-white" />
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              </div>
              <div className="p-5">
                {section.content}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

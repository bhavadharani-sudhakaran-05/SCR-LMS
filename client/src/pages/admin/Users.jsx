import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUserGroup, HiSearch, HiUserAdd, HiPencil, HiTrash, HiBan, HiCheckCircle, HiFilter } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const mockUsers = [
  { _id: '1', name: 'Alex Robinson', email: 'alex@example.com', role: 'student', status: 'active', xpPoints: 4250, createdAt: '2024-01-15' },
  { _id: '2', name: 'Dr. Sarah Smith', email: 'sarah@example.com', role: 'teacher', status: 'active', xpPoints: 0, createdAt: '2024-01-10' },
  { _id: '3', name: 'Mike Torres', email: 'mike@example.com', role: 'student', status: 'active', xpPoints: 3650, createdAt: '2024-02-01' },
  { _id: '4', name: 'Mary Johnson', email: 'mary@example.com', role: 'parent', status: 'active', xpPoints: 0, createdAt: '2024-02-15' },
  { _id: '5', name: 'James Park', email: 'james@example.com', role: 'student', status: 'suspended', xpPoints: 1200, createdAt: '2024-03-01' },
  { _id: '6', name: 'Prof. Lee Chen', email: 'lee@example.com', role: 'teacher', status: 'active', xpPoints: 0, createdAt: '2024-01-20' },
  { _id: '7', name: 'Emma Wilson', email: 'emma@example.com', role: 'student', status: 'active', xpPoints: 5800, createdAt: '2024-01-05' },
  { _id: '8', name: 'Robert Davis', email: 'robert@example.com', role: 'parent', status: 'active', xpPoints: 0, createdAt: '2024-03-10' },
];

const Users = () => {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = users.filter(u =>
    (roleFilter === 'all' || u.role === roleFilter) &&
    (search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const roleColors = {
    student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    teacher: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    parent: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 mt-1">{users.length} total users</p>
        </div>
        <Button variant="primary" icon={HiUserAdd} onClick={() => setShowAddModal(true)}>Add User</Button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input icon={HiSearch} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['all', 'student', 'teacher', 'parent'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${roleFilter === r ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {r === 'all' ? 'All' : r + 's'}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        u.role === 'student' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                        u.role === 'teacher' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                        'bg-gradient-to-br from-purple-400 to-purple-600'
                      }`}>
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${u.status === 'active' ? 'text-emerald-600' : 'text-red-500'}`}>
                      <span className={`h-2 w-2 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit">
                        <HiPencil className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Suspend">
                        <HiBan className="h-4 w-4 text-amber-400" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                        <HiTrash className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email" type="email" placeholder="Enter email" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
            <select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Input label="Temporary Password" type="password" placeholder="Set temporary password" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" icon={HiUserAdd}>Create User</Button>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiSearch, HiEye, HiTrash, HiCheckCircle, HiXCircle, HiStar } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const mockCourses = [
  { _id: '1', title: 'Advanced Machine Learning', teacher: 'Dr. Sarah Smith', category: 'AI & ML', students: 145, rating: 4.9, status: 'published', createdAt: '2024-01-20' },
  { _id: '2', title: 'Web Development Bootcamp', teacher: 'Prof. Lee Chen', category: 'Web Dev', students: 230, rating: 4.7, status: 'published', createdAt: '2024-02-05' },
  { _id: '3', title: 'Data Structures & Algorithms', teacher: 'Dr. Sarah Smith', category: 'CS Fundamentals', students: 180, rating: 4.8, status: 'published', createdAt: '2024-01-15' },
  { _id: '4', title: 'Mobile App Development', teacher: 'Prof. Lee Chen', category: 'Mobile', students: 95, rating: 4.5, status: 'published', createdAt: '2024-03-01' },
  { _id: '5', title: 'Blockchain Fundamentals', teacher: 'Dr. Sarah Smith', category: 'Web3', students: 0, rating: 0, status: 'pending', createdAt: '2024-03-15' },
  { _id: '6', title: 'Cyber Security Essentials', teacher: 'Prof. Lee Chen', category: 'Security', students: 0, rating: 0, status: 'pending', createdAt: '2024-03-18' },
];

const gradients = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-pink-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
];

const Courses = () => {
  const [courses] = useState(mockCourses);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = courses.filter(c =>
    (statusFilter === 'all' || c.status === statusFilter) &&
    (search === '' || c.title.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Management</h1>
        <p className="text-gray-500 mt-1">{courses.length} total courses · {courses.filter(c => c.status === 'pending').length} awaiting approval</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input icon={HiSearch} placeholder="Search courses or teachers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'pending'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${statusFilter === s ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course, i) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden h-full flex flex-col" hover>
              <div className={`h-32 bg-gradient-to-r ${gradients[i % gradients.length]} p-5 flex items-end`}>
                <h3 className="text-lg font-bold text-white leading-tight">{course.title}</h3>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                    {course.teacher.split(' ').pop()[0]}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.teacher}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">{course.category}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${course.status === 'published' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
                    {course.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>{course.students} students</span>
                  {course.rating > 0 && (
                    <span className="flex items-center gap-1"><HiStar className="text-amber-400" /> {course.rating}</span>
                  )}
                </div>
                <div className="mt-auto flex gap-2">
                  {course.status === 'pending' ? (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
                        <HiCheckCircle className="h-4 w-4" /> Approve
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
                        <HiXCircle className="h-4 w-4" /> Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <HiEye className="h-4 w-4" /> View
                      </button>
                      <button className="flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-400 rounded-xl text-sm hover:bg-red-100 transition-colors">
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

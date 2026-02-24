import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBookOpen, HiSearch, HiAdjustments, HiClock, HiStar, HiPlay, HiUserGroup } from 'react-icons/hi';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const categories = ['All', 'Mathematics', 'Science', 'Computer Science', 'English', 'Arts', 'Business'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/api/courses', { params: { search, category: category !== 'All' ? category : undefined } });
        setCourses(data.data || []);
      } catch {
        setCourses([
          { _id: '1', title: 'Advanced Mathematics', description: 'Master calculus, linear algebra, and numerical methods with interactive exercises.', category: 'Mathematics', instructor: { name: 'Dr. Smith' }, enrolledStudents: [1,2,3], rating: 4.8, totalLessons: 42, thumbnail: null, level: 'Advanced', price: 0 },
          { _id: '2', title: 'Physics Fundamentals', description: 'Comprehensive physics course covering mechanics, thermodynamics, and electromagnetism.', category: 'Science', instructor: { name: 'Prof. Johnson' }, enrolledStudents: [1,2], rating: 4.6, totalLessons: 36, thumbnail: null, level: 'Intermediate', price: 0 },
          { _id: '3', title: 'Full-Stack Web Development', description: 'Build modern web apps with React, Node.js, and MongoDB from scratch.', category: 'Computer Science', instructor: { name: 'Dr. Lee' }, enrolledStudents: [1,2,3,4], rating: 4.9, totalLessons: 65, thumbnail: null, level: 'Beginner', price: 0 },
          { _id: '4', title: 'English Literature', description: 'Explore classic and modern literature with critical analysis techniques.', category: 'English', instructor: { name: 'Ms. Brown' }, enrolledStudents: [1], rating: 4.5, totalLessons: 28, thumbnail: null, level: 'Intermediate', price: 0 },
          { _id: '5', title: 'Digital Art & Design', description: 'Learn digital art fundamentals, UI/UX design, and creative tools.', category: 'Arts', instructor: { name: 'Mr. Garcia' }, enrolledStudents: [1,2,3], rating: 4.7, totalLessons: 35, thumbnail: null, level: 'Beginner', price: 0 },
          { _id: '6', title: 'Data Structures & Algorithms', description: 'Master DSA concepts with 200+ coding challenges and interview prep.', category: 'Computer Science', instructor: { name: 'Dr. Kumar' }, enrolledStudents: [1,2,3,4,5], rating: 4.9, totalLessons: 55, thumbnail: null, level: 'Advanced', price: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [search, category]);

  const filtered = courses.filter(c =>
    (category === 'All' || c.category === category) &&
    (search === '' || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-violet-500 to-purple-600',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-600',
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Courses</h1>
        <p className="text-gray-500 mt-1">Discover new courses and continue your learning journey</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input icon={HiSearch} placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <motion.div
              key={course._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden h-full flex flex-col" padding="">
                <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} p-6 flex flex-col justify-between`}>
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1 text-white">
                      <HiStar className="h-4 w-4 text-amber-300" />
                      <span className="text-sm font-bold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><HiPlay className="h-3.5 w-3.5" />{course.totalLessons} lessons</span>
                    <span className="flex items-center gap-1"><HiUserGroup className="h-3.5 w-3.5" />{course.enrolledStudents?.length || 0} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                      {course.instructor?.name?.[0] || 'T'}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{course.instructor?.name}</span>
                    <Button variant="primary" size="xs" className="ml-auto">Enroll</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <HiBookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No courses found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Courses;

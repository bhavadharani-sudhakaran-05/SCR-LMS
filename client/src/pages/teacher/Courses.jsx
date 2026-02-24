import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBookOpen, HiUserGroup, HiPlusCircle, HiPencil, HiTrash, HiEye, HiStar } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Courses = () => {
  const [courses, setCourses] = useState([
    { _id: '1', title: 'Advanced Mathematics', description: 'Calculus, linear algebra, and numerical methods.', category: 'Mathematics', enrolledStudents: new Array(32), totalLessons: 42, rating: 4.8, status: 'published', thumbnail: null },
    { _id: '2', title: 'Physics Fundamentals', description: 'Mechanics, thermodynamics, and electromagnetism.', category: 'Science', enrolledStudents: new Array(28), totalLessons: 36, rating: 4.6, status: 'published', thumbnail: null },
    { _id: '3', title: 'Computer Science 101', description: 'Intro to programming, data structures, and algorithms.', category: 'Computer Science', enrolledStudents: new Array(45), totalLessons: 65, rating: 4.9, status: 'published', thumbnail: null },
    { _id: '4', title: 'English Literature', description: 'Classic and modern literature with critical analysis.', category: 'English', enrolledStudents: new Array(22), totalLessons: 28, rating: 4.5, status: 'draft', thumbnail: null },
  ]);

  const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-orange-500 to-red-500'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-gray-500 mt-1">Manage and create your courses</p>
        </div>
        <Link to="/teacher/courses/create">
          <Button variant="primary" icon={HiPlusCircle}>Create Course</Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}>
            <Card className="overflow-hidden" padding="">
              <div className={`h-36 bg-gradient-to-br ${gradients[i % gradients.length]} p-6 flex flex-col justify-between`}>
                <div className="flex justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.status === 'published' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-amber-500/20 text-amber-100'}`}>
                    {course.status === 'published' ? '✅ Published' : '📝 Draft'}
                  </span>
                  <div className="flex items-center gap-1 text-white">
                    <HiStar className="h-4 w-4 text-amber-300" /><span className="text-sm font-bold">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><HiUserGroup className="h-4 w-4" /> {course.enrolledStudents.length} students</span>
                  <span className="flex items-center gap-1"><HiBookOpen className="h-4 w-4" /> {course.totalLessons} lessons</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="xs" icon={HiPencil}>Edit</Button>
                  <Button variant="outline" size="xs" icon={HiEye}>Preview</Button>
                  <Button variant="ghost" size="xs" icon={HiTrash} className="text-red-500 ml-auto">Delete</Button>
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

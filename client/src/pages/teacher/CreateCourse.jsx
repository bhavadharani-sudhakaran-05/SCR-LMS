import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiBookOpen, HiPhotograph, HiDocumentAdd, HiSave, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const categories = ['Mathematics', 'Science', 'Computer Science', 'English', 'History', 'Arts', 'Business', 'Health', 'Engineering', 'Social Sciences'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: 'Computer Science', level: 'Beginner',
    prerequisites: '', tags: '', maxStudents: 50,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error('Title and description are required');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/courses', {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        prerequisites: form.prerequisites.split(',').map(t => t.trim()).filter(Boolean),
      });
      toast.success('Course created successfully!');
      navigate('/teacher/courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <HiArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Course</h1>
          <p className="text-gray-500 mt-1">Fill in the details to create a new course</p>
        </div>
      </motion.div>

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit}>
        <Card className="p-8 space-y-6">
          <Input label="Course Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Introduction to Machine Learning" icon={HiBookOpen} required />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              placeholder="Describe your course objectives, topics, and what students will learn..."
              rows={5}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
              <select name="level" value={form.level} onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <Input label="Max Students" name="maxStudents" type="number" value={form.maxStudents} onChange={handleChange} />
          <Input label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} placeholder="react, javascript, web development" />
          <Input label="Prerequisites (comma separated)" name="prerequisites" value={form.prerequisites} onChange={handleChange} placeholder="Basic programming, HTML/CSS" />

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" icon={HiSave} loading={loading}>Create Course</Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </Card>
      </motion.form>
    </div>
  );
};

export default CreateCourse;

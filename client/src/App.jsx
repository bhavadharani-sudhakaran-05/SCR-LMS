import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import useAuthStore from './store/authStore';
import useThemeStore from './store/themeStore';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Shared
import Landing from './pages/shared/Landing';

// Lazy loaded pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentCourses = lazy(() => import('./pages/student/Courses'));
const StudentLeaderboard = lazy(() => import('./pages/student/Leaderboard'));
const StudentBadges = lazy(() => import('./pages/student/Badges'));
const StudentAITutor = lazy(() => import('./pages/student/AITutor'));
const StudentQuizzes = lazy(() => import('./pages/student/Quizzes'));
const StudentAssignments = lazy(() => import('./pages/student/Assignments'));
const StudentChat = lazy(() => import('./pages/student/Chat'));

const TeacherDashboard = lazy(() => import('./pages/teacher/Dashboard'));
const TeacherCourses = lazy(() => import('./pages/teacher/Courses'));
const TeacherCreateCourse = lazy(() => import('./pages/teacher/CreateCourse'));
const TeacherGrading = lazy(() => import('./pages/teacher/Grading'));
const TeacherAnalytics = lazy(() => import('./pages/teacher/Analytics'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminCourses = lazy(() => import('./pages/admin/Courses'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

const ParentDashboard = lazy(() => import('./pages/parent/Dashboard'));
const ParentProgress = lazy(() => import('./pages/parent/Progress'));

// Loading spinner
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[60vh]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent"
    />
  </div>
);

// Protected Route
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={`/${user?.role}`} replace />;
  }
  return children;
};

function App() {
  const { loadUser, isAuthenticated, user } = useAuthStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    const token = localStorage.getItem('acadrix_token');
    if (token) loadUser();
    else useAuthStore.setState({ isLoading: false });
  }, []);

  const getDashboardRedirect = () => {
    if (!isAuthenticated || !user) return '/login';
    return `/${user.role}`;
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardRedirect()} /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardRedirect()} /> : <Register />} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="leaderboard" element={<StudentLeaderboard />} />
            <Route path="badges" element={<StudentBadges />} />
            <Route path="ai-tutor" element={<StudentAITutor />} />
            <Route path="chat" element={<StudentChat />} />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/create" element={<TeacherCreateCourse />} />
            <Route path="grading" element={<TeacherGrading />} />
            <Route path="analytics" element={<TeacherAnalytics />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Parent Routes */}
          <Route
            path="/parent"
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ParentDashboard />} />
            <Route path="progress" element={<ParentProgress />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

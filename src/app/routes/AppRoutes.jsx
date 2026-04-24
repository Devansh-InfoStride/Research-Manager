import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import ProjectsPage from '../../features/projects/pages/ProjectsPage';
import ProjectDetailPage from '../../features/projects/pages/ProjectDetailPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import BookmarksPage from '../../features/bookmarks/pages/BookmarksPage';
import NotesPage from '../../features/notes/pages/NotesPage';
import ComparisonsPage from '../../features/comparisons/pages/ComparisonsPage';
import LoginPage from '../../features/auth/pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="insights" element={<NotesPage />} />
        <Route path="comparisons" element={<ComparisonsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

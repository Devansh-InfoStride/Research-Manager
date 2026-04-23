import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import projectRoutes from '../modules/projects/projects.routes.js';
import bookmarkRoutes from '../modules/bookmarks/bookmarks.routes.js';
import comparisonRoutes from '../modules/comparisons/comparisons.routes.js';
import noteRoutes from '../modules/notes/notes.routes.js';
import healthRoutes from '../modules/health/health.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/comparisons', comparisonRoutes);
router.use('/notes', noteRoutes);
router.use('/health', healthRoutes);

export default router;

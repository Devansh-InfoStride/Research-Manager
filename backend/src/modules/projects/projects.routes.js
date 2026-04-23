import express from 'express';
import * as projectsController from './projects.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProject);
router.post('/', projectsController.createProject);
router.patch('/:id', projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

export default router;

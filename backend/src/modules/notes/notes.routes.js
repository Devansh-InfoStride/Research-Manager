import express from 'express';
import * as notesController from './notes.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', notesController.getAllNotes);
router.post('/', notesController.createNote);

export default router;

import express from 'express';
import * as bookmarksController from './bookmarks.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', bookmarksController.getAllBookmarks);

export default router;

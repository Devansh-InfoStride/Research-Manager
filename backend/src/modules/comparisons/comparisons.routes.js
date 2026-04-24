import express from 'express';
import * as comparisonsController from './comparisons.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', comparisonsController.getAllComparisons);

export default router;

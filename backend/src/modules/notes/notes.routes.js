import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/', (req, res) => res.json({ data: { notes: [] } }));

export default router;

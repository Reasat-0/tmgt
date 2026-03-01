import { Router } from 'express';
import { authVefifierMiddleware } from '../middleware/authMiddleware.js';
import { createTrip, updateTrip } from '../controller/tripController.js';

const router = Router();

router.post('/create', authVefifierMiddleware, createTrip);
router.put('/update/:id', authVefifierMiddleware, updateTrip);
// router.post('/', createUser);

export default router;

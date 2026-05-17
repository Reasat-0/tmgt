import { Router } from 'express';
import { authVerifierMiddleware } from '../middleware/authMiddleware.js';
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  updateTrip,
} from '../controller/tripController.js';

const router = Router();

router.post('/create', authVerifierMiddleware, createTrip);
router.put('/update/:id', authVerifierMiddleware, updateTrip);
router.delete('/delete/:id', authVerifierMiddleware, deleteTrip);
router.get('/getAll', authVerifierMiddleware, getAllTrips);
// router.post('/', createUser);

export default router;

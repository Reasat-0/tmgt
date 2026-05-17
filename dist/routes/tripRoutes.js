import { Router } from 'express';
import { authVefifierMiddleware } from '../middleware/authMiddleware.js';
import { createTrip, deleteTrip, getAllTrips, updateTrip, } from '../controller/tripController.js';
const router = Router();
router.post('/create', authVefifierMiddleware, createTrip);
router.put('/update/:id', authVefifierMiddleware, updateTrip);
router.delete('/delete/:id', authVefifierMiddleware, deleteTrip);
router.get('/getAll', authVefifierMiddleware, getAllTrips);
// router.post('/', createUser);
export default router;
//# sourceMappingURL=tripRoutes.js.map
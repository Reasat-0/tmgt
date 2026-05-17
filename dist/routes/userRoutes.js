import { Router } from 'express';
import { getAllUsers } from '../controller/userController.js';
import { authVefifierMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', authVefifierMiddleware, getAllUsers);
// router.post('/', createUser);
export default router;
//# sourceMappingURL=userRoutes.js.map
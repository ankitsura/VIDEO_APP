import express from  'express';
import { deleteUser, getAllUsers, getUser, toogleSubscribe, update } from '../controllers/userControllers.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/find/:id', getUser);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, deleteUser);
router.put('/sub/:id', verifyToken, toogleSubscribe);

export default router;
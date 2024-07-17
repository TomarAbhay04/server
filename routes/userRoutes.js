import express from 'express';
import { createUser, getUserById, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;

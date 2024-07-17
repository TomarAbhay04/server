import express from 'express';
import { updateInventory, getInventoryStatus } from '../controllers/inventoryController.js';

const router = express.Router();

router.put('/:id', updateInventory);
router.get('/', getInventoryStatus);

export default router;

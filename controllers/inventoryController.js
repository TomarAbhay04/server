// import {Inventory} from '../models/User.js';

// export const updateInventory = async (req, res) => {
//   try {
//     const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(inventory);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating inventory', error });
//   }
// };

// export const getInventoryStatus = async (req, res) => {
//   try {
//     const inventory = await Inventory.find();
//     res.status(200).json(inventory);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching inventory', error });
//   }
// };

import express from 'express';
import { checkout, paymentVerification, getBookingsByUserId } from '../controllers/paymentController.js';


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route('/bookings/:userId').get(getBookingsByUserId);


export default router;
import {Reservation} from '../models/User.js';

export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

export const getReservationsByUserId = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId }).populate('userId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations for user', error });
  }
};

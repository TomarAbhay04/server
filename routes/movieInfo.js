import express from 'express';
import {
    getMovieInfo,
    getMovieInfoById,
    getMovieSeatsById,
    getAvailableDates,
    getTimeSlotsByDate
} from "../controllers/movieController.js";

const router = express.Router();

// Route to get all movies
router.get("/movies", getMovieInfo);

// Route to get movie by ID
router.get('/movies/:movieId', getMovieInfoById);

// Route to get movie seats by movie ID
router.get('/movies/:movieId/seats', getMovieSeatsById);

// Route to get available dates for a movie
router.get('/movies/:movieId/dates', getAvailableDates);

// Route to get time slots for a specific date and movie
router.get('/movies/:movieId/timeslots/:date', getTimeSlotsByDate);

export default router;

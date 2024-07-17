import {Movie} from '../models/movies.js';

export const getMovieInfo = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server error hai abhi to' });
    }
};

export const getMovieInfoById = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findOne({ uniqueId: movieId });
        // console.log(movie);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Server error hai abhi to' });
    }
};

export const getMovieSeatsById = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findOne({ uniqueId: movieId });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Extract seats data from the movie object
        const seatsData = movie.availableSlots.map(slot => ({
            date: slot.date,
            timeSlots: slot.timeSlots,
            seats: slot.seats
        }));

        res.json({ seatsData });
    } catch (error) {
        console.error('Error fetching movie seats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAvailableDates = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findOne({ uniqueId: movieId });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const availableDates = movie.availableSlots.map(slot => slot.date);

        res.json({ availableDates });
    } catch (error) {
        console.error('Error fetching available dates:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getTimeSlotsByDate = async (req, res) => {
    try {
        const { movieId, date } = req.params;
        const movie = await Movie.findOne({ uniqueId: movieId });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Convert date string to a Date object for comparison
        const targetDate = new Date(date);

        // Find the available slots for the given date
        const targetSlot = movie.availableSlots.find(slot => {
            // Check if the date matches the target date
            return slot.date.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0];
        });

        // If no slots found for the given date, return empty array
        if (!targetSlot) {
            return res.json({ timeSlots: [] });
        }

        // Return the time slots for the target date
        res.json({ timeSlots: targetSlot.timeSlots });
    } catch (error) {
        console.error('Error fetching time slots:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

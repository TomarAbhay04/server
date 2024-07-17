// uploadImages.js
import mongoose from 'mongoose';
import { Movie } from '../models/movies.js';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: '../config/config.env' });

// Function to convert an image to Base64
const imageToBase64 = (filePath) => {
    try {
        const file = fs.readFileSync(filePath);
        return file.toString('base64');
    } catch (err) {
        console.error(`Error converting ${filePath} to Base64:`, err);
        return null;
    }
};

// Function to upload images and update movie data
const uploadImages = async () => {
    const imageDirectory = 'C:\\Users\\hp\\Downloads\\Images for Website'; // Updated directory containing the images
    const movieFiles = fs.readdirSync(imageDirectory); // Read files in the directory

    // Filter out only .jpg files
    const imageFiles = movieFiles.filter(file => path.extname(file).toLowerCase() === '.jpg');

    const movies = []; // Store movie data

    imageFiles.forEach((file, index) => {
        const imagePath = path.join(imageDirectory, file);
        const base64Image = imageToBase64(imagePath);

        if (base64Image) {
            const movie = {
                title: `Movie ${index + 1}`,
                uniqueId: `movie_${index + 1}`,
                imageSrc: base64Image,
                trailerLink: `https://www.youtube.com/watch?v=trailer_${index + 1}`,
                availableSlots: generateMovieSlotsData()
            };

            movies.push(movie);
        }
    });

    try {
        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Movie.deleteMany({});

        // Insert new data
        await Movie.insertMany(movies);

        console.log('Images and movie data have been uploaded to MongoDB.');
    } catch (error) {
        console.error('Error uploading images:', error);
    } finally {
        mongoose.disconnect();
    }
};

// Function to generate slots data
const generateMovieSlotsData = () => {
    const slotsData = [];
    for (let j = 0; j < 3; j++) {
        const date = new Date();
        date.setDate(date.getDate() + j); // Increment date for each day
        const slots = {
            date: date.toISOString(),
            timeSlots: [
                { timeSlot: '11:00 AM', seats: generateSeatsData(100) },
                { timeSlot: '02:00 PM', seats: generateSeatsData(100) },
                { timeSlot: '06:00 PM', seats: generateSeatsData(100) }
            ]
        };
        slotsData.push(slots);
    }
    return slotsData;
};

// Function to generate seats data
const generateSeatsData = (count) => {
    const seats = [];
    const seatsPerRow = 10;
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // Define rows
    for (let i = 0; i < count; i++) {
        const seatNumber = ((i % seatsPerRow) + 1);
        const row = rows[Math.floor(i / seatsPerRow)];
        const seat = {
            seatNumber: `${seatNumber}`,
            seatRow: row,
            available: true
        };
        seats.push(seat);
    }
    return seats;
};

// Run the script
uploadImages();

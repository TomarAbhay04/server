import Movie from '../models/movies.js';
import {config} from 'dotenv';
import mongoose from 'mongoose';
// const moviesData = require('./movies.json');

config({path: './config/config.env'});

const startDataUpload = async () => {
    try {
        await Movie.create(moviesData);
        console.log('Data uploaded successfully');  
        console.log(moviesData);
    } catch (error) {
        console.error('Error uploading data:', error);
    }
}

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    startDataUpload();
})
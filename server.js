import app from './app.js'; // Import your Express app
import Razorpay from 'razorpay';
import { config } from "dotenv"; // Import dotenv
import mongoose from 'mongoose'; // Import Mongoose
// import fs from 'fs';
// import {Movie} from './models/movies.js';
config({ path: "./config/config.env" });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
  
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB: ', err));

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

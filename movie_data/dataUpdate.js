import { Movie } from '../models/movies.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config({ path: '../config/config.env' });

const startDataUpload = async () => {
  try {
    console.log("Starting data update...");

    // Update documents with specific conditions
    const result = await Movie.updateMany(
      {
        language: "Unknown",
        duration: "Unknown",
        format: "Unknown",
        releaseDate: new Date("2024-07-20T07:05:47.111+00:00"), // Assuming default unknown date
        certificate: "U",
        categories:  [] // Assuming default unknown categories are an empty array
      },
      {
        $set: {
          language: "Hindi",
          duration: "2h 58m",
          format: "2D",
          releaseDate: new Date("2024-07-22T00:00:00Z"),
          certificate: "U",
          categories: ["Action", "Drama", "Comedy"]
        }
      }
    );

    console.log("Documents updated successfully:", result);
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    startDataUpload();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

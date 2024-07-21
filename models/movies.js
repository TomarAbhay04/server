import mongoose from "mongoose";

// Seat schema
const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    seatRow: { type: String, required: true },
    available: { type: Boolean, default: true }
});


// // Movie slot schema
const movieSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    timeSlots: [{
        timeSlot: { type: String, required: true },
        seats: [seatSchema], // Seats information for this time slot
        availableSeatsCount: { type: Number, default: 100 } // Optimization
    }]
});

// const timeSlotSchema = new mongoose.Schema({
//     // date: { type: Date, required: true },
//     timeSlot: { type: String, required: true },
//     seats: [seatSchema]
// });


// Movie schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    uniqueId: { type: String, required: true, unique: true },
    imageSrc: { type: String, required: true },
    trailerLink: { type: String },
    availableSlots: [movieSlotSchema], 
    language: { type: String, default: "Unknown" },
    duration: { type: String, default: "Unknown" },
    format: { type: String, default: "2D" }, // 2D/3D etc.
    releaseDate: { type: Date, default: Date.now },
    certificate: { type: String, default: "U" },
    categories: { type: [String], default: [] }
});

// movieSchema.index({ createdAt: 1 });

// Theater schema
const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String }
});

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    movieTitle: { type: String, required: true },
    totalPayment: { type: Number, required: true },
    slot: { // Storing slot details directly
      date: { type: Date, required: true },
      timeSlot: { type: String, required: true }
    },
    seats: [seatSchema],  // Array of seat documents
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    bookedAt: { type: Date } // Add bookedAt field
  });
  

// Model definitions
const Movie = mongoose.model('Movie', movieSchema);
const Theater = mongoose.model('Theater', theaterSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Named exports
export { Movie, Theater, Booking };

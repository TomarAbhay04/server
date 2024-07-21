import crypto from "crypto";
import { instance } from "../server.js";
// import { Payment } from "../models/paymentModel.js";
import { Movie, Booking } from "../models/movies.js"; // Booking model
// import { type } from "os";

export const checkout = async (req, res) => {
  try {
    const { totalPayment } = req.body;
    if (
      !totalPayment ||
      typeof totalPayment !== "number" ||
      isNaN(totalPayment)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid totalPayment provided",
      });
    }

    const options = {
      amount: Number(totalPayment * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    bookingDetails,
  } = req.body;

  const verifySignature = (data, razorpaySignature, secret) => {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${data.order_id}|${data.payment_id}`);
    const generatedSignature = hmac.digest("hex");
    return generatedSignature === razorpaySignature;
  };

  try {
    const isValid = verifySignature(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      process.env.RAZORPAY_API_SECRET
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const {
      userId,
      selectedMovie,
      selectedDate,
      selectedTimeSlot,
      selectedSeats,
      totalPayment,
    } = bookingDetails;

    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const movie = await Movie.findById(selectedMovie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update the availability of each selected seat individually
    for (const seat of selectedSeats) {
      const updateResult = await Movie.updateOne(
        {
          _id: selectedMovie,
          "availableSlots.date": date,
          "availableSlots.timeSlots.timeSlot": selectedTimeSlot,
          "availableSlots.timeSlots.seats._id": seat._id
        },
        {
          $set: { "availableSlots.$[slot].timeSlots.$[timeSlot].seats.$[seat].available": false }
        },
        {
          arrayFilters: [
            { "slot.date": date },
            { "timeSlot.timeSlot": selectedTimeSlot },
            { "seat._id": seat._id }
          ]
        }
      );

      if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "Seat not updated. It might be already booked." });
      }
    }

    // Save the booking details
    const booking = new Booking({
      userId,
      movie: selectedMovie,
      slot: {
        date: date,
        timeSlot: selectedTimeSlot,
      },
      totalPayment: totalPayment,
      movieTitle: movie.title,
      seats: selectedSeats.map((seat) => ({ ...seat, available: false })),
      paymentStatus: "paid",
      bookedAt: new Date(),
      //  bookedAt: bookingData.bookedAt ? new Date(bookingData.bookedAt) : null,
    });

    await booking.save();

    res.status(200).json({
      message: "Payment verified successfully",
      redirectURL: `/paymentsuccess?reference=${razorpay_payment_id}`,
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error updating seats", error });
  }
};

export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId });

    if (!bookings) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

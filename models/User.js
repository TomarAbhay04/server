import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userType: { type: String, enum: ['passenger', 'staff', 'admin'] },
   // For approval tracking
  phoneNumber: { type: String }
});


const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainId: { type: String, required: true },
    date: { type: Date, required: true },
    bedRollId: { type: String, required: true }
  });

  const InventorySchema = new mongoose.Schema({
    stationId: { type: String, required: true },
    trainId: { type: String, required: true },
    bedRollsAvailable: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
  });
  
  
  const User = mongoose.model('User', UserSchema);
  const Reservation = mongoose.model('Reservation', ReservationSchema);
    const Inventory = mongoose.model('Inventory', InventorySchema);


export {User, Reservation, Inventory};

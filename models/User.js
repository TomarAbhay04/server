import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
//   userType: { type: String, enum: ['passenger', 'staff', 'admin'] },
   // For approval tracking
  phoneNumber: { type: Number }
});
  

  const User = mongoose.model('User', UserSchema);


export {User} ;

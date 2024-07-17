import { User } from '../models/User.js';

export const googleSignInHandler = async (req, res) => {
  const { email, displayName, role } = req.body; // Assume role is passed in request
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        displayName,
        role: role === 'staff' || role === 'admin' ? 'pending' : 'passenger',
        status: role === 'staff' || role === 'admin' ? 'pending' : 'active',
      });
      await user.save();
    } else if (user.role !== role && (role === 'staff' || role === 'admin')) {
      user.role = 'pending';
      user.status = 'pending';
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error handling Google sign-in:', error);
    res.status(400).json({ message: 'Failed to handle sign-in' });
  }
};

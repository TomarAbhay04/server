import { User } from '../models/User.js';

export const registerUser = async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    if (!name || !phoneNumber || !email) {
        return res.status(400).json({ message: 'Name, email, and phoneNumber are required' });
    }

    try {
        const existingUser = await User.findOne({ phoneNumber, email });

        if (existingUser) {
            // If user exists, return a message indicating that the user is already registered.
            return res.status(200).json({ message: 'User already registered. You can log in.' });
        }

        const newUser = new User({
            name,
            email,
            phoneNumber,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

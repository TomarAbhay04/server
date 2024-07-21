
import express from 'express';
import path from 'path';
import cors from 'cors';
import paymentRoute from './routes/paymentRoutes.js';
import movieInfo from './routes/movieInfo.js';
import { get } from 'http';
import {registerUser} from './routes/registerUser.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();
const __dirname = path.resolve(); // Get absolute path for reliability

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// ... Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ... Routes
app.use('/api', paymentRoute);

app.use('/', movieInfo);
app.use('/api/register', registerUser);
// app.use('/api/register', userRoutes);

app.get('/api/getkey', (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY 
  })
});

// ... (Rest of your logic)

export default app;
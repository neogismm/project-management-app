import express from 'express';
import connectDB from './config/db.js';
import router from './routes/taskRoutes.js';
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

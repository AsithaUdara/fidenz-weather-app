import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for your frontend application
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the weather routes for any request to /api
app.use('/api', weatherRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
import { Router, Request, Response } from 'express';
import { getWeatherData } from '../services/weather.service';

const router = Router();

// Define the GET endpoint for weather
router.get('/weather', async (req: Request, res: Response) => {
  try {
    const data = await getWeatherData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

export default router;
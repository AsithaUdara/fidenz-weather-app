import axios from 'axios';
import dotenv from 'dotenv';
import cache from './cache.service';
import cityData from '../../data/cities.json';

// Load .env variables
dotenv.config();

interface City {
  CityCode: string;
  CityName: string;
}

const cities: City[] = cityData.List;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async () => {
  if (!API_KEY) {
    throw new Error('OPENWEATHER_API_KEY is missing. Please check your .env file.');
  }

  const weatherPromises = cities.map(async (city) => {
    const cacheKey = `weather_${city.CityCode}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log(`CACHE HIT: For ${city.CityName}.`);
      return cachedData;
    }

    try {
      console.log(`CACHE MISS: Fetching for ${city.CityName}.`);
      const response = await axios.get(API_BASE_URL, {
        params: { id: city.CityCode, appid: API_KEY, units: 'metric' },
      });

      const data = response.data;

      // Extract all the fields required by the UI
      const weatherInfo = {
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        description: data.weather[0].description,
        main: data.weather[0].main, // e.g., "Clouds", "Rain", "Clear"
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility / 1000, // Convert from meters to km
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        dt: data.dt, // Timestamp for the data
      };

      cache.set(cacheKey, weatherInfo);
      return weatherInfo;
    } catch (err) {
      console.error(`Failed to fetch weather for ${city.CityName} (${city.CityCode}):`, err);
      // On failure, try serving stale cache if present; otherwise, skip this city
      const stale = cache.get(cacheKey);
      if (stale) {
        console.warn(`Serving stale cache for ${city.CityName}.`);
        return stale;
      }
      return null; // will be filtered out
    }
  });

  const results = await Promise.all(weatherPromises);
  return results.filter(Boolean);
};
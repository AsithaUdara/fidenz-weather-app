'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '@/components/WeatherCard';
import { useWeather } from '@/context/WeatherContext';

export default function Home() {
  const { allWeatherData, setAllWeatherData } = useWeather();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (allWeatherData.length === 0) {
        try {
          const response = await axios.get('http://localhost:5000/api/weather');
          setAllWeatherData(response.data);
          setError(null);
        } catch (error) {
          // Log the error to aid debugging during development
          console.error('Error fetching weather data:', error);
          setError('Failed to fetch data. Is the backend running?');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [allWeatherData.length, setAllWeatherData]);

  return (
    <div className="max-w-5xl mx-auto">
      {loading && <p className="text-center text-xl mt-10">Loading Data...</p>}
      {error && <p className="text-center text-red-400 text-xl mt-10">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allWeatherData.map((cityData) => (
            <WeatherCard key={cityData.name} data={cityData} />
          ))}
        </div>
      )}
    </div>
  );
}
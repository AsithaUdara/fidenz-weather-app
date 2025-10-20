'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '@/components/WeatherCard';
import { useWeather } from '@/context/WeatherContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const { allWeatherData, setAllWeatherData } = useWeather();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      if (allWeatherData.length === 0) {
        try {
          // Step 1: get API access token from our local Auth route
          const tokenRes = await axios.get('/api/auth/token');
          const { accessToken } = tokenRes.data as { accessToken: string };
          if (!accessToken) throw new Error('No access token');

          // Step 2: call backend directly with Authorization header
          const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
          const response = await axios.get(`${backendBase}/api/weather`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setAllWeatherData(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching weather data:', err);
          const status = (typeof err === 'object' && err && 'response' in err && (err as { response?: { status?: number } }).response?.status) ?? undefined;
          if (status === 401) setError('Unauthorized. Please log out and log in again to refresh your session.');
          else setError('Failed to fetch data. Ensure the backend is running and accessible.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [allWeatherData.length, setAllWeatherData, user]);

  if (isUserLoading) return (
    <div className="flex justify-center items-center mt-10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <p className="ml-3 text-xl">Loading...</p>
    </div>
  );

  // If not logged in, show the login modal
  if (!user) return <LoginModal />;

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
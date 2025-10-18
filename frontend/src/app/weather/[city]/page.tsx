'use client';

import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

// We'll reuse the bottom section from WeatherCard by rendering it directly
import { BottomSection } from '@/components/WeatherCard';

const formatTime = (timestamp: number) => new Date(timestamp * 1000)
  .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  .replace(' ', '')
  .toLowerCase();

const formatDate = (timestamp: number) => new Date(timestamp * 1000)
  .toLocaleDateString([], { month: 'short', day: 'numeric' });

export default function ViewWeather() {
  const { selectedCity } = useWeather();
  const router = useRouter();

  useEffect(() => {
    if (!selectedCity) router.push('/');
  }, [selectedCity, router]);

  if (!selectedCity) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-xl overflow-hidden shadow-lg shadow-black/30">
        <div className="bg-blue-500 p-6 relative">
          <button onClick={() => router.push('/')} className="absolute top-4 left-4 text-white/80 hover:text-white">
            <IoArrowBack size={24} />
          </button>
          <div className="text-center pt-8">
            <h2 className="text-2xl font-bold">{selectedCity.name}, {selectedCity.country}</h2>
            <p className="text-blue-100 opacity-80 text-sm">
              {formatTime(selectedCity.dt)}, {formatDate(selectedCity.dt)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 mt-4">
            <p className="text-7xl font-bold">{Math.round(selectedCity.temp)}<span className="align-super text-3xl font-medium">°C</span></p>
            <div className="flex flex-col items-start">
              <p className="text-blue-100 opacity-80 text-sm">Temp Min: {Math.round(selectedCity.temp_min)}°C</p>
              <p className="text-blue-100 opacity-80 text-sm">Temp Max: {Math.round(selectedCity.temp_max)}°C</p>
            </div>
          </div>
        </div>
        <div className="bg-[#2D2D38] p-6 grid grid-cols-3 gap-4 text-center text-sm text-gray-300">
          <BottomSection data={selectedCity} />
        </div>
      </div>
    </div>
  );
}

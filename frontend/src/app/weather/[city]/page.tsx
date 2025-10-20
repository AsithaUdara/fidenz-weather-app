'use client';

import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

// We'll reuse the bottom section from WeatherCard by rendering it directly
import { BottomSection } from '@/components/WeatherCard';

const formatTime = (timestamp: number) => new Date(timestamp * 1000)
  .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  .replace(' ', '')
  .toLowerCase();

const formatDate = (timestamp: number) => new Date(timestamp * 1000)
  .toLocaleDateString([], { month: 'short', day: 'numeric' });

const getWeatherIcon = (main: string) => {
  const size = 64;
  if (!main) return <WiCloudy size={size} />;
  const lowerMain = main.toLowerCase();
  switch (lowerMain) {
    case 'clear': return <WiDaySunny size={size} />;
    case 'clouds': return <WiCloudy size={size} />;
    case 'rain': case 'drizzle': return <WiRain size={size} />;
    case 'thunderstorm': return <WiThunderstorm size={size} />;
    case 'snow': return <WiSnow size={size} />;
    case 'mist': case 'fog': return <WiFog size={size} />;
    default: return <WiCloudy size={size} />;
  }
};

export default function ViewWeather() {
  const { selectedCity } = useWeather();
  const router = useRouter();

  useEffect(() => {
    if (!selectedCity) router.push('/');
  }, [selectedCity, router]);

  if (!selectedCity) return null;

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/30 max-w-4xl mx-auto w-full">
      <div className="bg-[#5AA9E6] p-12 relative" style={{ minHeight: '340px' }}>
        <button onClick={() => router.push('/')} className="absolute top-6 left-6 text-white/80 hover:text-white">
          <IoArrowBack size={28} />
        </button>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold text-white mb-2">{selectedCity.name}, {selectedCity.country}</h2>
          <p className="text-blue-100 opacity-80 text-lg mb-6">
            {formatTime(selectedCity.dt)}, {formatDate(selectedCity.dt)}
          </p>
          <div className="flex items-center justify-center gap-12 w-full">
            <div className="flex flex-col items-center">
              <span className="text-white/90 mb-2">{getWeatherIcon(selectedCity.main || 'Clouds')}</span>
              <span className="text-white text-xl font-medium mt-2 capitalize">{selectedCity.description || selectedCity.main || 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-white tracking-tight">{Math.round(selectedCity.temp)}°C</span>
              <span className="text-white/80 text-base mt-2">Temp Min: {Math.round(selectedCity.temp_min)}°C</span>
              <span className="text-white/80 text-base">Temp Max: {Math.round(selectedCity.temp_max)}°C</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#353744] px-10 py-8 grid grid-cols-3 gap-8 text-gray-300 text-lg">
        <BottomSection data={selectedCity} />
      </div>
    </div>
  );
}

"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayHaze, WiBarometer, WiHumidity, WiSunrise, WiSunset
} from 'react-icons/wi';
import { FiNavigation } from "react-icons/fi"; // Hollow Navigate Icon
import { IoClose } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { useWeather, WeatherData } from '@/context/WeatherContext';

interface WeatherCardProps {
  data: WeatherData;
}

// **FIXED**: New date/time formatting to match the target design (9.19am format)
const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" ", "").toLowerCase();
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' });
};

// **FIXED**: Increased main icon size from 80 to 96
const getWeatherIcon = (main: string) => {
  const size = 96;
  if (!main) return <WiDayHaze size={size} />;
  const lowerMain = main.toLowerCase();
  switch (lowerMain) {
    case 'clear': return <WiDaySunny size={size} />;
    case 'clouds': return <WiCloudy size={size} />;
    case 'rain': case 'drizzle': return <WiRain size={size} />;
    case 'thunderstorm': return <WiThunderstorm size={size} />;
    case 'snow': return <WiSnow size={size} />;
    case 'mist': case 'fog': return <WiFog size={size} />;
    default: return <WiDayHaze size={size} />;
  }
};

// **FIX #1: PIXEL-PERFECT CARD COLORS**
// This function now maps specific city names to their exact colors from the design.
const getCardStyle = (city: string) => {
  switch (city) {
    case 'Colombo':
      return { bg: 'bg-blue-500', text: 'text-blue-100' };
    case 'Tokyo':
      return { bg: 'bg-purple-500', text: 'text-purple-100' };
    case 'Liverpool':
      return { bg: 'bg-teal-500', text: 'text-teal-100' }; // This is green in the design
    case 'Sydney':
      return { bg: 'bg-orange-400', text: 'text-orange-100' };
    case 'Boston':
      return { bg: 'bg-red-500', text: 'text-red-100' };
    default:
      return { bg: 'bg-gray-600', text: 'text-gray-100' }; // A fallback for other cities
  }
};

// Exportable bottom section for reuse in detail page
export const BottomSection = ({ data }: { data: WeatherCardProps['data'] }) => (
  <>
    <div className="flex flex-col items-start text-left space-y-1">
      <p className="flex items-center gap-2"><WiBarometer size={20} /> Pressure: {data.pressure ?? 'N/A'}hPa</p>
      <p className="flex items-center gap-2"><WiHumidity size={20} /> Humidity: {data.humidity ?? 'N/A'}%</p>
      <p className="flex items-center gap-2"><MdVisibility size={16} className="ml-0.5" /> Visibility: {data.visibility ? data.visibility.toFixed(1) : 'N/A'}km</p>
    </div>
    <div className="flex flex-col items-center justify-center">
      <FiNavigation size={24} style={{ transform: `rotate(${data.wind_deg || 0}deg)` }} />
      <p>{data.wind_speed ? data.wind_speed.toFixed(1) : 'N/A'}m/s</p>
    </div>
    <div className="flex flex-col items-start text-left space-y-1">
      <p className="flex items-center gap-2"><WiSunrise size={20} /> Sunrise: {data.sunrise ? formatTime(data.sunrise) : 'N/A'}</p>
      <p className="flex items-center gap-2"><WiSunset size={20} /> Sunset: {data.sunset ? formatTime(data.sunset) : 'N/A'}</p>
    </div>
  </>
);

const WeatherCard: React.FC<WeatherCardProps> & { BottomSection?: typeof BottomSection } = ({ data }) => {
  const { setSelectedCity } = useWeather();
  // We now pass the city name to get the specific color style
  const { bg, text } = getCardStyle(data.name);

  return (
    <Link href={`/weather/${encodeURIComponent(data.name)}`} onClick={() => setSelectedCity(data)} className="block">
      <div className="rounded-xl overflow-hidden shadow-lg shadow-black/30">
        <div className={`relative ${bg} p-6`}>
        {/* **FIX #2: VISIBLE IN-CARD CLOUDS** */}
        {/* The 'brightness-0' class was incorrect. Removing it makes the inverted (white) image visible. */}
        <Image 
          src="/cloud-pattern.png" 
          alt="weather pattern" 
          layout="fill" 
          objectFit="cover" 
          className="invert opacity-20 pointer-events-none" 
        />
        <div className="relative z-10">
          <button className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors">
            <IoClose size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{data.name}{data.country ? `, ${data.country}` : ''}</h2>
            {/* **FIXED**: Fainter text color for date/time */}
            <p className={`${text} opacity-80 text-sm`}>
              {data.dt ? `${formatTime(data.dt)}, ${formatDate(data.dt)}` : 'N/A'}
            </p>
          </div>
          {/* **FIXED**: Layout changed to justify-around for better spacing */}
          <div className="flex items-center justify-around mt-4">
            <div className={`flex flex-col items-center ${text}`}>
              {getWeatherIcon(data.main || 'clear')}
              <p className="capitalize text-white">{data.description || 'N/A'}</p>
            </div>
            <div className="flex flex-col items-start">
              {/* **FIXED**: Correct superscript styling for °C */}
              <p className="text-7xl font-bold">{Math.round(data.temp)}<span className="align-super text-3xl font-medium">°C</span></p>
              {/* **FIXED**: Fainter text color for Temp Min/Max */}
              <p className={`${text} opacity-80 text-sm`}>Temp Min: {data.temp_min ? Math.round(data.temp_min) : 'N/A'}°C</p>
              <p className={`${text} opacity-80 text-sm`}>Temp Max: {data.temp_max ? Math.round(data.temp_max) : 'N/A'}°C</p>
            </div>
          </div>
          </div>
        </div>
        <div className="bg-[#2D2D38] p-6 grid grid-cols-3 gap-4 text-center text-sm text-gray-300">
          <BottomSection data={data} />
        </div>
      </div>
    </Link>
  );
};
WeatherCard.BottomSection = BottomSection;

export default WeatherCard;

"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayHaze, WiBarometer, WiHumidity, WiSunrise, WiSunset
} from 'react-icons/wi';
import { FiNavigation } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { useWeather, WeatherData } from '@/context/WeatherContext';

interface WeatherCardProps {
  data: WeatherData;
}

// Format time as "9.19am" to match target design
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  return `${displayHours}.${minutes.toString().padStart(2, '0')}${ampm}`;
};

// Format date as "Feb 8"
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Larger cloud icons to match design
const getWeatherIcon = (main: string) => {
  const size = 120;
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

// Pixel-perfect colors matching the target design
const getCardStyle = (city: string) => {
  switch (city) {
    case 'Colombo':
      return { bg: 'bg-[#2986cc]', text: 'text-white' }; // More vivid blue
    case 'Tokyo':
      return { bg: 'bg-[#8e44ad]', text: 'text-white' }; // More vivid purple
    case 'Liverpool':
      return { bg: 'bg-[#009688]', text: 'text-white' }; // More vivid teal
    case 'Paris':
      return { bg: 'bg-[#37474f]', text: 'text-white' }; // More contrast slate
    case 'Sydney':
      return { bg: 'bg-[#e67e22]', text: 'text-white' }; // More vivid orange
    case 'Boston':
      return { bg: 'bg-[#c0392b]', text: 'text-white' }; // More vivid red
    case 'Shanghai':
      return { bg: 'bg-[#3f51b5]', text: 'text-white' }; // More vivid indigo
    case 'Oslo':
      return { bg: 'bg-[#00897b]', text: 'text-white' }; // More vivid cyan
    default:
      return { bg: 'bg-[#263238]', text: 'text-white' }; // More contrast default
  }
};

// Bottom section with improved layout matching target design
export const BottomSection = ({ data }: { data: WeatherCardProps['data'] }) => (
  <>
    <div className="flex flex-col items-start text-left space-y-1.5 text-xs">
      <p className="flex items-center gap-1.5">
        <WiBarometer size={18} />
        <span><span className="font-semibold">Pressure:</span> {data.pressure ?? 'N/A'}hPa</span>
      </p>
      <p className="flex items-center gap-1.5">
        <WiHumidity size={18} />
        <span><span className="font-semibold">Humidity:</span> {data.humidity ?? 'N/A'}%</span>
      </p>
      <p className="flex items-center gap-1.5">
        <MdVisibility size={14} className="ml-0.5" />
        <span><span className="font-semibold">Visibility:</span> {data.visibility ? data.visibility.toFixed(1) : 'N/A'}km</span>
      </p>
    </div>
    <div className="flex flex-col items-center justify-center gap-1">
      <FiNavigation size={28} style={{ transform: `rotate(${data.wind_deg || 0}deg)` }} />
      <p className="text-xs">{data.wind_speed ? data.wind_speed.toFixed(1) : 'N/A'}m/s</p>
      <p className="text-[10px] text-gray-400">{data.wind_deg || 0}° Degree</p>
    </div>
    <div className="flex flex-col items-start text-left space-y-1.5 text-xs">
      <p className="flex items-center gap-1.5">
        <WiSunrise size={18} />
        <span><span className="font-semibold">Sunrise:</span> {data.sunrise ? formatTime(data.sunrise) : 'N/A'}</span>
      </p>
      <p className="flex items-center gap-1.5">
        <WiSunset size={18} />
        <span><span className="font-semibold">Sunset:</span> {data.sunset ? formatTime(data.sunset) : 'N/A'}</span>
      </p>
    </div>
  </>
);

const WeatherCard: React.FC<WeatherCardProps> & { BottomSection?: typeof BottomSection } = ({ data }) => {
  const { setSelectedCity } = useWeather();
  const { bg, text } = getCardStyle(data.name);

  return (
    <Link href={`/weather/${encodeURIComponent(data.name)}`} onClick={() => setSelectedCity(data)} className="block hover:scale-[1.02] transition-transform duration-200">
      <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/40 max-w-md mx-auto">
        {/* Top colored section */}
        <div className={`relative ${bg} px-6 pt-4 pb-8 overflow-hidden`}>
          {/* Cloud pattern background - WHITE TRANSPARENT CLOUDS */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/cloud-pattern.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7, // Increased opacity for cloud pattern
              filter: 'brightness(1.5)'
            }}
          ></div>
          
          {/* Large decorative circles like in target design */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/15 blur-3xl"></div>
          <div className="absolute right-8 top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-16 top-16 w-48 h-48 rounded-full bg-white/8 blur-2xl"></div>
          <div className="absolute left-12 bottom-4 w-32 h-32 rounded-full bg-white/12 blur-xl"></div>
          
          <div className="relative z-10">
            {/* Close button */}
            <button 
              className="absolute top-0 right-0 text-white/60 hover:text-white transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <IoClose size={28} />
            </button>
            
            {/* City name and time */}
            <div className="text-left mb-6">
              <h2 className="text-2xl font-bold text-white mb-0.5">
                {data.name}{data.country ? `, ${data.country.substring(0, 2)}` : ''}
              </h2>
              <p className="text-white/70 text-sm">
                {data.dt ? `${formatTime(data.dt)}, ${formatDate(data.dt)}` : 'N/A'}
              </p>
            </div>
            
            {/* Weather icon and temperature - side by side */}
            <div className="flex items-center justify-between">
              {/* Left: Weather icon and description */}
              <div className="flex flex-col items-center">
                <div className="text-white/90">
                  {getWeatherIcon(data.main || 'Clouds')}
                </div>
                <p className="text-white text-base font-medium mt-2 capitalize">
                  {data.description || 'N/A'}
                </p>
              </div>
              
              {/* Right: Temperature */}
              <div className="flex flex-col items-end text-right">
                <div className="flex items-start leading-none">
                  <span className="text-[72px] font-bold text-white tracking-tight">
                    {Math.round(data.temp)}
                  </span>
                  <span className="text-3xl font-normal text-white/90 mt-2">°C</span>
                </div>
                <p className="text-white/60 text-xs mt-2">
                  Temp Min: {data.temp_min ? Math.round(data.temp_min) : 'N/A'}°C
                </p>
                <p className="text-white/60 text-xs">
                  Temp Max: {data.temp_max ? Math.round(data.temp_max) : 'N/A'}°C
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom dark section with details */}
        <div className="bg-[#2D2D38] px-6 py-5 grid grid-cols-3 gap-6 text-gray-300">
          <BottomSection data={data} />
        </div>
      </div>
    </Link>
  );
};
WeatherCard.BottomSection = BottomSection;

export default WeatherCard;
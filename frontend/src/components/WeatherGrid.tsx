import React from 'react';
import WeatherCard from './WeatherCard';
import { WeatherData } from '@/context/WeatherContext';

interface WeatherGridProps {
  // Accept a lightweight array but allow passing through to WeatherCard with type cast
  data: Array<Partial<WeatherData> & { name: string; temp: number; description: string }>;
}

const WeatherGrid: React.FC<WeatherGridProps> = ({ data }) => {
  return (
    // Responsive grid: 1 column on small screens, 2 on medium, 4 on large screens.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((weather) => (
        <WeatherCard key={weather.name} data={weather as WeatherData} />
      ))}
    </div>
  );
};

export default WeatherGrid;

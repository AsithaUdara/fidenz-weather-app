'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the structure of our weather data
export interface WeatherData {
  name: string; country: string; temp: number; temp_min: number; temp_max: number;
  description: string; main: string; pressure: number; humidity: number;
  visibility: number; wind_speed: number; wind_deg: number; sunrise: number;
  sunset: number; dt: number;
}

// Define the shape of our context
interface WeatherContextType {
  allWeatherData: WeatherData[];
  setAllWeatherData: (data: WeatherData[]) => void;
  selectedCity: WeatherData | null;
  setSelectedCity: (city: WeatherData | null) => void;
}

// Create the context with a default value
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Create the Provider component
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [allWeatherData, setAllWeatherData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ allWeatherData, setAllWeatherData, selectedCity, setSelectedCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

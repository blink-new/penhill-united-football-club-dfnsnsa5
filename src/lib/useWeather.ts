import { useEffect, useState } from 'react';

type Weather = { 
  temp: number; 
  rain: string;
  condition: string;
  humidity: number;
  windSpeed: number;
};

export default function useWeather(): Weather {
  const [data, setData] = useState<Weather>({ 
    temp: 19, 
    rain: 'Loading…',
    condition: 'Loading...',
    humidity: 0,
    windSpeed: 0
  });

  // Penhill United FC location (approximate coordinates for North Wiltshire)
  const lat = 51.5074;   // London coordinates as fallback
  const lon = -0.1278;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenWeatherMap API key not found');
      setData({ 
        temp: 19, 
        rain: 'Clear',
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 8
      });
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=1&appid=${apiKey}`
    )
      .then(r => {
        if (!r.ok) {
          throw new Error(`HTTP ${r.status}`);
        }
        return r.json();
      })
      .then(j => {
        const current = j.list[0];
        const weather = current.weather[0];
        
        setData({
          temp: Math.round(current.main.temp),
          rain: current.rain?.['3h'] ? `${current.rain['3h']} mm` : 'Clear',
          condition: weather.main,
          humidity: current.main.humidity,
          windSpeed: Math.round(current.wind.speed * 3.6) // Convert m/s to km/h
        });
      })
      .catch((error) => {
        console.error('Weather fetch failed:', error);
        // Offline/error fallback with realistic data
        setData({ 
          temp: 19, 
          rain: 'Offline',
          condition: 'Unknown',
          humidity: 65,
          windSpeed: 8
        });
      });
  }, [lat, lon]);

  return data;
}
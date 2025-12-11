import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Get from https://openweathermap.org/api

  const fetchWeather = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      // Current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      
      // 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list.slice(0, 5));
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const convertTemp = (temp) => {
    return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`;
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather Forecast</h1>
          <form onSubmit={handleSubmit} className="weather-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="weather-input"
            />
            <button type="submit" className="weather-btn">
              Search
            </button>
          </form>
          <div className="unit-toggle">
            <button
              className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
            >
              °C
            </button>
            <button
              className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
            >
              °F
            </button>
          </div>
        </header>

        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {weather && (
          <main className="weather-main">
            <div className="current-weather">
              <div className="location">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <div className="weather-info">
                <div className="temperature">
                  <img 
                    src={getWeatherIcon(weather.weather[0].icon)} 
                    alt={weather.weather[0].description}
                  />
                  <h3>{convertTemp(weather.main.temp)}</h3>
                  <p>{weather.weather[0].description}</p>
                </div>
                
                <div className="weather-details">
                  <div className="detail-item">
                    <span>Feels Like</span>
                    <span>{convertTemp(weather.main.feels_like)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Humidity</span>
                    <span>{weather.main.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span>Wind Speed</span>
                    <span>{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Pressure</span>
                    <span>{weather.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="forecast">
              <h3>5-Day Forecast</h3>
              <div className="forecast-cards">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <p className="forecast-day">
                      {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <img 
                      src={getWeatherIcon(day.weather[0].icon)} 
                      alt={day.weather[0].description}
                    />
                    <p className="forecast-temp">
                      {convertTemp(day.main.temp)}
                    </p>
                    <p className="forecast-desc">{day.weather[0].main}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {!weather && !loading && !error && (
          <div className="welcome">
            <h2>Welcome to Weather App</h2>
            <p>Enter a city name to get current weather and 5-day forecast</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
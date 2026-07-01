import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('New Delhi')
  const [searchInput, setSearchInput] = useState('')

  // List of major cities with exchanges
  const majorCities = [
    { name: 'New Delhi', country: 'India', exchange: 'NSE' },
    { name: 'Mumbai', country: 'India', exchange: 'NSE/BSE' },
    { name: 'New York', country: 'USA', exchange: 'NYSE' },
    { name: 'London', country: 'UK', exchange: 'LSE' },
    { name: 'Tokyo', country: 'Japan', exchange: 'TSE' },
    { name: 'Hong Kong', country: 'Hong Kong', exchange: 'HKEX' },
    { name: 'Singapore', country: 'Singapore', exchange: 'SGX' },
    { name: 'Sydney', country: 'Australia', exchange: 'ASX' },
    { name: 'Frankfurt', country: 'Germany', exchange: 'FSE' },
    { name: 'Paris', country: 'France', exchange: 'Euronext' },
  ]

  useEffect(() => {
    fetchWeather(city)
  }, [city])

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    try {
      // Using OpenWeatherMap API (free tier)
      const apiKey = 'b6fd43953d86a9d6bedafd3f3edddbab' // Free tier key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      )
      
      setWeather({
        city: response.data.name,
        country: response.data.sys.country,
        temp: Math.round(response.data.main.temp),
        feelsLike: Math.round(response.data.main.feels_like),
        tempMin: Math.round(response.data.main.temp_min),
        tempMax: Math.round(response.data.main.temp_max),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        cloudiness: response.data.clouds.all,
      })

      // Get 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      )
      
      // Group forecast by day
      const dailyForecasts = {}
      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString()
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            date,
            temp: Math.round(item.main.temp),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: item.wind.speed,
            humidity: item.main.humidity,
          }
        }
      })
      
      setForecast(Object.values(dailyForecasts).slice(0, 5))
    } catch (err) {
      setError('Failed to fetch weather data. Please try another city.')
      console.error('Weather fetch error:', err)
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setCity(searchInput)
      setSearchInput('')
    }
  }

  const getWeatherColor = (temp) => {
    if (temp > 35) return 'text-red-500'
    if (temp > 25) return 'text-orange-500'
    if (temp > 15) return 'text-yellow-500'
    if (temp > 5) return 'text-blue-400'
    return 'text-blue-600'
  }

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '🌤️',
      '02n': '🌤️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌦️',
      '09n': '🌦️',
      '10d': '🌧️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    }
    return iconMap[iconCode] || '🌡️'
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">🌤️ Weather Dashboard</h2>
        <p className="text-gray-400 mb-4">Real-time weather for major financial markets</p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick City Selection */}
        <div className="flex gap-2 flex-wrap">
          {majorCities.map((c) => (
            <button
              key={c.name}
              onClick={() => setCity(c.name)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                city === c.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-400 py-8">
          Loading weather data...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Current Weather Card */}
      {weather && !loading && (
        <>
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 border border-blue-700 mb-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Weather Info */}
              <div className="flex items-center">
                <div className="text-7xl mr-6">{getWeatherIcon(weather.icon)}</div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{weather.city}, {weather.country}</h3>
                  <p className="text-2xl text-blue-200 capitalize">{weather.description}</p>
                </div>
              </div>

              {/* Temperature Display */}
              <div>
                <div className={`text-6xl font-bold mb-4 ${getWeatherColor(weather.temp)}`}>
                  {weather.temp}°C
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
                    <p className="text-blue-200">Feels Like</p>
                    <p className="text-xl font-semibold text-white">{weather.feelsLike}°C</p>
                  </div>
                  <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
                    <p className="text-blue-200">Humidity</p>
                    <p className="text-xl font-semibold text-white">{weather.humidity}%</p>
                  </div>
                  <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
                    <p className="text-blue-200">Wind Speed</p>
                    <p className="text-xl font-semibold text-white">{weather.windSpeed.toFixed(1)} m/s</p>
                  </div>
                  <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3">
                    <p className="text-blue-200">Pressure</p>
                    <p className="text-xl font-semibold text-white">{weather.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Min/Max Temperatures */}
            <div className="mt-6 pt-6 border-t border-blue-700 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-200 text-sm">Min Temperature</p>
                <p className="text-2xl font-bold text-white">{weather.tempMin}°C</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Max Temperature</p>
                <p className="text-2xl font-bold text-white">{weather.tempMax}°C</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Cloudiness</p>
                <p className="text-2xl font-bold text-white">{weather.cloudiness}%</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Trading Condition</p>
                <p className="text-2xl font-bold text-green-400">
                  {weather.temp > 0 && weather.temp < 40 ? '✓ Good' : '⚠ Caution'}
                </p>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {forecast.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">📅 5-Day Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition">
                    <p className="text-sm text-gray-400 mb-3">{day.date}</p>
                    <div className="text-4xl mb-3">{getWeatherIcon(day.icon)}</div>
                    <p className="text-2xl font-bold text-white mb-2">{day.temp}°C</p>
                    <p className="text-sm text-blue-300 capitalize mb-3">{day.description}</p>
                    <div className="text-xs text-gray-400">
                      <p>💨 {day.windSpeed.toFixed(1)} m/s</p>
                      <p>💧 {day.humidity}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WeatherDashboard

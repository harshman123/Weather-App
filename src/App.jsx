import React from 'react'
import { useState } from 'react'

const App = () => {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchWeather() {
    if(city.trim() === "") return;
    try{
      setLoading(true)
      setError("")

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c248461bd58e0706615ea819483dd72a&units=metric`);

      if(!response.ok){
        throw new Error("City not found")
      }
      
      const data = await response.json();
      setWeather(data);

      
    }catch(err){
      setError(err.message)
      setWeather(null)
    }finally{
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      fetchWeather();
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p style={{textAlign: 'center', color: '#667eea', fontWeight: 'bold'}}>Loading...</p>}

      {error && <p style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{error}</p>}

      {weather && (
        <div>
          <div className="weather-main">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <p className="weather-description">{weather.weather[0].description}</p>
          </div>

          <div className="weather-details">
            <div className="detail-card">
              <h3>Feels Like</h3>
              <p>{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="detail-card">
              <h3>Humidity</h3>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="detail-card">
              <h3>Wind Speed</h3>
              <p>{weather.wind.speed} m/s</p>
            </div>
            <div className="detail-card">
              <h3>Pressure</h3>
              <p>{weather.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
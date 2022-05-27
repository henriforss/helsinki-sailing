import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const LikeButton = () => {
  const [likeButton, setLikeButton] = useState(false)

  const handleLikeButton = () => {
    setLikeButton(!likeButton)
    console.log(likeButton)
  }

  if (likeButton === false) {
    return (
      <div>
        <button onClick={handleLikeButton}>Press here to like</button>
      </div>
    )
  } else {
    return (
      <div>
        You like this!
      </div>
    )
  }
}

const ShowWeather = () => {
  const [weather, setWeather] = useState(null)

  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather')

  weatherUrl.searchParams.set('q', 'Helsinki')
  weatherUrl.searchParams.set('appid', `${apiKey}`)
  weatherUrl.searchParams.set('units', 'metric')

  const getWeather = () => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather(response.data)
      })
    }
    
  useEffect(getWeather, [])
  console.log(weather)

  if (weather === null) {
    return (
      <div>
        No data
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li>Temperature: {weather.main.temp} Celsius</li>
          <li>Feels like: {weather.main.feels_like} Celsius</li>
          <li>Humidity: {weather.main.humidity} %</li>
          <li>Pressure: {weather.main.pressure} hPa</li>
          <li>Clouds: {weather.clouds.all} %</li>
          <li>Wind: {weather.wind.speed} m/s</li>
          <li>Wind direction: {weather.wind.deg} degrees</li>
        </ul>
      </div>
    )
  }
}

const App = () => {
  return (
    <div>
      <h2>Helsinki Sailing Weather</h2>
      <ShowWeather />
      <LikeButton />
    </div>
  )
}

export default App

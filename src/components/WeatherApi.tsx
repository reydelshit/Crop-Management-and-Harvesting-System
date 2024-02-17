import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { TiWeatherCloudy } from 'react-icons/ti'

export default function WeatherApi() {
  const [weather, setWeather] = useState<any[]>([])
  const fetchWeather = async () => {
    await axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=6.3344&longitude=124.9528&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,surface_pressure,wind_speed_10m,wind_gusts_10m&timezone=auto',
      )
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setWeather([res.data])
        }
      })
  }
  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="m-2 bg-white rounded-sm text-black p-2">
      <h1 className="font-bold text-2xl ">
        Tupi, South Cotabato Weather{' '}
        <TiWeatherCloudy className="inline-block text-4xl" />
      </h1>

      {weather.map((w, index) => {
        return (
          <div key={index}>
            <h1>
              Temperature: {w.current.temperature_2m}{' '}
              {w.current_units.temperature_2m}
            </h1>
            <h1>
              Wind Speed: {w.current.wind_speed_10m}{' '}
              {w.current_units.wind_speed_10m}
            </h1>

            <h1>
              Surface Pressure: {w.current.surface_pressure}{' '}
              {w.current_units.surface_pressure}
            </h1>

            <h1>
              Relative Humidity: {w.current.relative_humidity_2m}{' '}
              {w.current_units.relative_humidity_2m}
            </h1>
            <p>Time: {moment(w.current.time).format('LLL')}</p>
          </div>
        )
      })}
    </div>
  )
}

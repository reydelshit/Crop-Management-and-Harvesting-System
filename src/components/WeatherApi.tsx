import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { TiWeatherCloudy } from 'react-icons/ti'

export default function WeatherApi() {
  const [weather, setWeather] = useState<any[]>([])
  const fetchWeather = async () => {
    await axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=6.3344&longitude=124.9528&current=temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m&hourly=soil_temperature_6cm&daily=weather_code,temperature_2m_max,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FSingapore',
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

      {/* other version  */}
      {weather &&
        weather.map((w, index) => {
          return (
            <div key={index}>
              <div>
                <h1>TODAY</h1>

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

              <div>
                <h1>DAILY</h1>
                <div className="flex gap-2">
                  {w.daily.time
                    .map((time: any, index: number) => {
                      return (
                        <div className="p-2 border-2" key={index}>
                          <h1>{moment(time).format('MMM Do')}</h1>

                          <p>Max Temp: {w.daily.temperature_2m_max[index]}</p>
                          <p>Wind Speed: {w.daily.wind_speed_10m_max[index]}</p>
                          <p>Wind Speed: {w.daily.precipitation_sum[index]}</p>
                        </div>
                      )
                    })
                    .slice(1, 4)}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

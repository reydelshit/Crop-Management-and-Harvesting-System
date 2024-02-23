import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { TiWeatherCloudy } from 'react-icons/ti'

export default function WeatherApi() {
  const [weather, setWeather] = useState<any[]>([])

  // tupi latitude and longitude
  const lat = 6.33219
  const long = 124.950172

  const fetchWeather = async () => {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m&hourly=soil_temperature_6cm&daily=weather_code,temperature_2m_max,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FSingapore`,
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
    <div className="m-2 bg-primary-red rounded-sm text-primary-yellow p-2 max-h-[35rem] mb-4">
      <h1 className="font-bold text-[1.3rem] ">
        Tupi, South Cotabato Weather{' '}
        <TiWeatherCloudy className="inline-block text-4xl" />
      </h1>

      {/* other version  */}
      {weather.length > 0 ? (
        weather.map((w, index) => {
          return (
            <div className="h-full" key={index}>
              <div>
                <h1 className="font-semibold">
                  TODAY {moment(w.current.time).format('LLL')}
                </h1>

                <h1 className="bg-primary-yellow mb-2 text-primary-red p-1 rounded-md font-bold">
                  Temperature: {w.current.temperature_2m}{' '}
                  {w.current_units.temperature_2m}
                </h1>
                <h1 className="bg-primary-yellow mb-2 text-primary-red p-1 rounded-md font-bold">
                  Wind Speed: {w.current.wind_speed_10m}{' '}
                  {w.current_units.wind_speed_10m}
                </h1>

                <h1 className="bg-primary-yellow mb-2 text-primary-red p-1 rounded-md font-bold">
                  Surface Pressure: {w.current.surface_pressure}{' '}
                  {w.current_units.surface_pressure}
                </h1>

                <h1 className="bg-primary-yellow mb-2 text-primary-red p-1 rounded-md font-bold">
                  Relative Humidity: {w.current.relative_humidity_2m}{' '}
                  {w.current_units.relative_humidity_2m}
                </h1>
              </div>

              <div>
                <h1 className="font-bold">NEXT DAY</h1>
                <div className="flex gap-2 flex-col">
                  {w.daily.time
                    .map((time: any, index: number) => {
                      return (
                        <div
                          className="p-2 bg-primary-yellow rounded-sm text-primary-red font-semibold"
                          key={index}
                        >
                          <h1>{moment(time).format('MMM Do')}</h1>

                          <p>
                            Max Temp: {w.daily.temperature_2m_max[index]}{' '}
                            {w.daily_units.temperature_2m_max}
                          </p>
                          <p>
                            Wind Speed: {w.daily.wind_speed_10m_max[index]}{' '}
                            {w.daily_units.wind_speed_10m_max}
                          </p>
                          <p>
                            Wind Speed: {w.daily.precipitation_sum[index]}{' '}
                            {w.daily_units.precipitation_sum}
                          </p>
                        </div>
                      )
                    })
                    .slice(1, 3)}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <h1>Loading... or no internet</h1>
      )}
    </div>
  )
}

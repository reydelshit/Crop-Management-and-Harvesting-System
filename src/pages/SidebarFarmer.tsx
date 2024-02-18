import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import WeatherApi from '@/components/WeatherApi'
import { GiPlantSeed } from 'react-icons/gi'
import { GrAnalytics } from 'react-icons/gr'
import { GrSchedules } from 'react-icons/gr'

export default function Sidebar() {
  return (
    <div className="block w-[20rem] h-screen bg-violet-700 text-white fixed">
      <div className=" flex flex-col justify-between w-full h-[90%] mt-[5rem]">
        <div className="flex flex-col font-semibold">
          <Link className="p-2 mb-2 flex items-center gap-2 text-2xl" to="/">
            <GiPlantSeed className="text-md h-[1.5rem] w-[1.5rem]" /> Manage
            Crops
          </Link>
          <Link
            className="p-2 mb-2 flex items-center gap-2 text-2xl"
            to="/manage-field"
          >
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
            Field Management
          </Link>

          <Link
            className="p-2 mb-2 flex items-center gap-2 text-2xl"
            to="/reporting"
          >
            <GrAnalytics className="text-md h-[1.5rem] w-[1.5rem]" /> Reporting
          </Link>

          <Link
            className="p-2 mb-2 flex items-center gap-2 text-2xl"
            to="/generate-schedule"
          >
            <GrSchedules className="text-md h-[1.5rem] w-[1.5rem]" /> Schedule
            Generation
          </Link>
        </div>

        <div>
          <WeatherApi />
        </div>
      </div>
    </div>
  )
}

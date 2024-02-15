import { Outlet, useLocation } from 'react-router-dom'

import App from '@/App'
import Sidebar from '@/pages/farmers/SidebarFarmer'

export default function FarmerRoot() {
  const location = useLocation()

  // console.log(location.pathname)
  return (
    <div className="flex w-full ">
      <Sidebar />
      <div className="w-full border-2 px-2">
        {location.pathname === '/' ? <App /> : <Outlet />}
      </div>
    </div>
  )
}

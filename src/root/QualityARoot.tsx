import { Outlet, useLocation } from 'react-router-dom'

import SidebarQA from '@/pages/qualityAssurance/SidebarQA'
import QualityAssurance from '@/pages/qualityAssurance/QualityAssurance'

export default function QualityARoot() {
  const location = useLocation()

  // console.log(location.pathname)
  return (
    <div className="flex w-full ">
      <SidebarQA />
      <div className="w-full border-2 px-2">
        {location.pathname === '/qa' ? <QualityAssurance /> : <Outlet />}
      </div>
    </div>
  )
}

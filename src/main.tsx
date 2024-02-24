import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutFarmer from './root/LayoutFarmer'
import FarmerRoot from './root/FarmerRoot'

import Login from './Login'
import ViewCrops from './pages/crops/ViewCrops'
import FieldManagement from './pages/FieldManagement'
import Reports from './pages/Reports'
import ScheduleGeneration from './pages/ScheduleGeneration'
import Crops from './pages/Crops'
import Register from './pages/Register'

const logoutUser = async () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutFarmer>
        <FarmerRoot />
      </LayoutFarmer>
    ),
    errorElement: <div>Not found</div>,

    children: [
      {
        path: 'crops',
        element: <Crops />,
      },
      {
        path: 'crops/:id',
        element: <ViewCrops />,
      },
      {
        path: 'manage-field',
        element: <FieldManagement />,
      },
      {
        path: 'Reports',
        element: <Reports />,
      },

      {
        path: 'generate-schedule',
        element: <ScheduleGeneration />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <div>Not found</div>,
  },

  {
    path: '/register',
    element: <Register />,
    errorElement: <div>Not found</div>,
  },

  {
    path: 'logout',
    action: logoutUser,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import Layout from './Layout'
import FarmerRoot from './root/FarmerRoot'
import QualityARoot from './root/QualityARoot'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <FarmerRoot />
      </Layout>
    ),
    errorElement: <div>Not found</div>,
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <div>Not found</div>,
  },

  {
    path: 'qa',
    element: <QualityARoot />,
    errorElement: <div>Not found</div>,

    children: [
      {
        path: 'visit',
        element: <div>yes</div>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

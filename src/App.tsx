import React from 'react'
import { IonApp, setupIonicReact } from '@ionic/react'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import { css } from '@emotion/css'
import { AnimatePresence } from 'framer-motion'
/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
/* Theme variables */

import './theme/variables.css'
import { useLocation, useRoutes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import { MapPage } from './pages/Map/MapPage'
import LoginPage from './pages/Login/LoginPage'
import NotFound from './pages/404/NotFoundPage'
import UserContext from './components/UserContext/UserContext'
import RegisterPage from './pages/Register/RegisterPage'

setupIonicReact()

const App: React.FC = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/map',
      element: <MapPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])

  const location = useLocation()

  if (!element) return null

  return (
    <div>
      <UserContext>
        <AnimatePresence mode="wait" initial={false}>
          {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </UserContext>
    </div>
  )
}

export default App

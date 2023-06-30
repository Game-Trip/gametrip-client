import React, {useCallback, useState} from 'react'
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
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFound from './pages/404/NotFoundPage'
import UserContext from './components/UserContext/UserContext'
import RegisterPage from './pages/Register/RegisterPage'
import MapPage from './pages/Map/MapPage'
import { LocationDto, SearchedGameDto } from '@game-trip/ts-api-client'
import EmailCheck from './pages/EmailCheck/EmailCheck'
import { AnnonymSearchController } from './utils/api/baseApi'

setupIonicReact()

const App: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<
    LocationDto | undefined
  >();
  const navigate = useNavigate();
  const handleSelect = async (search?: SearchedGameDto) => {
    setSelectedLocation(search);
    if(search) {
      navigate('/map');
    }
  }

  const handleSearch = useCallback(async (search: string) => {
    const result = await AnnonymSearchController.searchSearchGameGet(search);
    setAvailableGames(result);
    return;
  },[]);
      const [availableGames, setAvailableGames] = useState<SearchedGameDto[]>([]);
      const [search, setSearch] = useState<string>('');

  const element = useRoutes([
    {
      path: '/',
      element: <HomePage onSearch={handleSearch} onSelect={handleSelect} options={availableGames} />,
    },
    {
      path: '/map',
      element: <MapPage selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/Auth/ConfirmationMail',
      element: <EmailCheck />,
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

export default App;

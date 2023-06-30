import React, { useState } from 'react'
import { setupIonicReact } from '@ionic/react'
import '@ionic/react/css/core.css'
import { AnimatePresence } from 'framer-motion'

import './theme/variables.css'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFound from './pages/404/NotFoundPage'
import UserContext from './components/UserContext/UserContext'
import RegisterPage from './pages/Register/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPassword/SendMail'
import ResetPasswordPage from './pages/ForgotPassword/ResetPassword'
import MapPage from './pages/Map/MapPage'
import { LocationDto, SearchedGameDto } from '@game-trip/ts-api-client'
import EmailCheck from './pages/EmailCheck/EmailCheck'
import { TopNavBar } from './components/TopNavBar/TopNavBar'
import LocationForm from './pages/LocationForm/LocationForm'
import { AnnonymSearchController } from './utils/api/baseApi'

setupIonicReact()

const App: React.FC = () => {

  const [selectedLocation, setSelectedLocation] = useState<
    LocationDto | undefined
  >();
  const navigate = useNavigate();
  const handleSelect = async (search?: SearchedGameDto) => {
    setSelectedGame(search);
    if (search) {
      navigate('/map');
    }
  }

  const handleSearch = async (search: string) => {
    if (search === '') {
      setSelectedGame(undefined);
    };
    const result = await AnnonymSearchController.searchSearchGameGet(search);
    setAvailableGames(result);
    setSearchValue(search);
  };
  const [availableGames, setAvailableGames] = useState<SearchedGameDto[]>([]);
  const [selectedGame, setSelectedGame] = useState<SearchedGameDto | undefined>();
  const [searchValue, setSearchValue] = useState<string>('');

  const element = useRoutes([
    {
      path: '/',
      element: <HomePage key={1} onSearch={handleSearch} onSelect={handleSelect} options={availableGames} searchValue={searchValue} />,
    },
    {
      path: '/map',
      element: <MapPage
        key={2}
        setSearchValue={handleSearch}
        setSelectedGame={setSelectedGame}
        selectedGame={selectedGame}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        availableGames={availableGames}
        setAvailableGames={setAvailableGames} searchValue={searchValue}
      />,
    },
    {
      path: '/login',
      element: <LoginPage key={3} />,
    },
    {
      path: '/register',
      element: <RegisterPage key={4} />,
    },
    {
      path: '/newlocation',
      element: <LocationForm key={5} />,
    },
    {
      path: '/Auth/ConfirmationMail',
      element: <EmailCheck key={4} />,
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

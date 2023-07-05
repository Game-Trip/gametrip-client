
import React, { useEffect, useState } from 'react'
import { setupIonicReact } from '@ionic/react'
import { AnimatePresence } from 'framer-motion'

import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import NotFound from './pages/404/NotFoundPage'
import RegisterPage from './pages/Register/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPassword/SendMail'
import ResetPasswordPage from './pages/ForgotPassword/ResetPassword'
import MapPage from './pages/Map/MapPage'
import EmailCheck from './pages/EmailCheck/EmailCheck'
import LocationForm from './pages/LocationForm/LocationForm'
import { SearchApi } from './utils/api/SearchApi'
import { LocationDto } from './utils/Models/Location/LocationDto'
import { SearchedGameDto } from './utils/Models/Search/SearchGamesDto'
import { GameApi } from './utils/api/GameApi'

setupIonicReact()

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    LocationDto | undefined
  >();
  const navigate = useNavigate();
  const handleSelect = async (search?: SearchedGameDto) => {
    setSelectedGame(search);
    setSearchValue(search!.name!);
    if (search) {
      navigate('/map');
    }
  }


  const handleSearch = async (search: string) => {
    setSearchValue(search);
  };
  const [availableGames, setAvailableGames] = useState<SearchedGameDto[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const result = await GameApi.getAllGames(null);
      setAvailableGames(result.data);
    };
    fetchGames();
  }, []);

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
      path: '/forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/Auth/FrogotPassword',
      element: <ResetPasswordPage />,
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
      <AnimatePresence mode="wait" initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </div>
  )
}

export default App;

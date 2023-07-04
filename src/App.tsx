import React, { useEffect, useState } from 'react'
import { setupIonicReact } from '@ionic/react'
import { AnimatePresence } from 'framer-motion'

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
import LocationForm from './pages/LocationForm/LocationForm'
import { AnnonymSearchController } from './utils/api/baseApi'

setupIonicReact()

const App: React.FC = () => {

  const [selectedLocation, setSelectedLocation] = useState <
  const [selectedLocation, setSelectedLocation] = useState<
    LocationDto | undefined
  >();
  const navigate = useNavigate();
  const handleSelect = async (search?: SearchedGameDto) => {
    if (!search || !search.name) {
      return;
    }
    setSelectedGame(search);
    setSearchValue(search.name);
    if (search) {
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
        const result = await AnnonymSearchController.searchSearchGameGet('');
        setAvailableGames(result);
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
          key={2}
          setSearchValue={handleSearch}
          setSelectedGame={setSelectedGame}
          selectedGame={selectedGame}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          availableGames={availableGames}
          setAvailableGames={setAvailableGames} searchValue={searchValue}
        />,
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

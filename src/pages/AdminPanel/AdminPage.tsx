import React, { memo, useMemo, useState, useRef, useCallback, useEffect } from "react";
import { css } from "@emotion/css";
import * as apiClient from "@game-trip/ts-api-client";
import { motion, useIsPresent } from "framer-motion";
import { Layer, Map, MapRef, Marker, Popup, ViewState } from "react-map-gl";
import { CollapsableNavBar } from "../../components/CollapsableNavBar/CollapsableNavBar";
import { AnnonymGameController, AnnonymLocationController, AnnonymSearchController, AnnonymUserController } from "../../utils/api/baseApi";
import Pin from "../../components/Pin/Pin";
import "mapbox-gl/dist/mapbox-gl.css";
import SelectionModal from "../../components/SelectionModal/SelectionModal";
import { GameDto, GameTripUser, GameTripUserDto, ListGameDto, LocationDto, SearchedGameDto, ServerConfiguration, UpdateGameDto, UpdateLocationDto } from "@game-trip/ts-api-client";
import AddLocationComponent from "../../components/NewLocation/AddLocationComponent";
import { useUser } from "../../hooks/useUser";
import { TopNavBar } from "../../components/TopNavBar/TopNavBar";
import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import Select, { SingleValue } from 'react-select'
import { Form } from "react-router-dom";



const AdminPage = () => {
  const { user, isLogged, isAdmin } = useUser();
  //TODO: Add admin check and regidirect to homePage if not admin
  //TODO: add snackbar


  const isPresent = useIsPresent();
  const [allGames, setAllGames] = useState<ListGameDto[]>([]);
  const [allLocations, setAllLocations] = useState<LocationDto[]>([]);
  const [allUsers, setAllUsers] = useState<GameTripUserDto[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationDto>();
  const [selectedUser, setSelectedUser] = useState<GameTripUserDto>();
  const [locationUpdateRequest, setLocationUpdateRequest] = useState<UpdateLocationDto>();
  const [gameUpdateRequest, setGameUpdateRequest] = useState<UpdateGameDto>();

  let LocationController = AnnonymLocationController;
  let GameController = AnnonymGameController;
  // let UserController = AnnonymUserController;
  if (isLogged) {
    const config = apiClient.createConfiguration({
      baseServer: new ServerConfiguration<{}>(
        "https://staging-api.game-trip.fr",
        {}
      ),
      authMethods: {
        'Bearer': {
          'tokenProvider': {
            getToken() {
              return user?.jwt;
            },
          }
        } as apiClient.HttpBearerConfiguration
      } as apiClient.AuthMethodsConfiguration,
    });
    LocationController = new apiClient.LocationApi(config);
    GameController = new apiClient.GameApi(config);
    // UserController = new apiClient.UserApi(config);
  }

  const [selectedGame, setSelectedGame] = useState<GameDto | undefined>();

  useEffect(() => {
    const getData = async () => {
      await LocationController.locationGet().then((response) => setAllLocations(response)).catch((error) => console.log(error))

      await GameController.gameGet().then((response) => setAllGames(response)).catch((error) => console.log(error))
    }

    getData();


  }, [])
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const handleSelectGame = useCallback((value: any) => {
    if (!value.value) {
      console.log("No value selected");
    }
    setSelectedGame(value.value);
    setGameModalOpen(!gameModalOpen);
  }, [gameModalOpen]);
  const closeGameModal = () => {
    setGameModalOpen(!gameModalOpen);
    setSelectedGame(undefined);
  }


  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const openSelectedLocationModal = () => {
    console.log("Selected Location ", selectedLocation as LocationDto);
    setLocationModalOpen(!locationModalOpen);
  }
  const closeSelectedLocationModal = () => {
    setLocationModalOpen(!locationModalOpen);
    setSelectedLocation(undefined);

  }


  console.log("Selected Game: ", selectedGame);
  console.log(selectedGame);

  return (
    <>
      <TopNavBar showHomeButton />
      <div className={styles.wrapper}>

        //TODO: Add in table list of games and locations with edit button

        //TODO: Add in table list of users with edit button

        //TODO: Add in table list of update request with edit button

        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select Game"
          isSearchable={true}
          name="color"
          options={allGames.map((game) => { return { value: game, label: game.name } })}
          onChange={handleSelectGame}
        />
        <Modal
          open={gameModalOpen}
          onClose={closeGameModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>

            <label>Game Name :</label>
            <input type="text" value={selectedGame?.name as string} onChange={(event) => setSelectedGame({ ...selectedGame, name: event.target.value })} />
            <label>Description :</label>
            <textarea name="description" value={selectedGame?.description as string} onChange={(event) => setSelectedGame({ ...selectedGame, description: event.target.value })} />
            <label>Editor :</label>
            <input type="text" value={selectedGame?.editor as string} readOnly />
            <label>Release Date :</label>
            <input type="date" value={selectedGame?.releaseDate?.toString() as string} onChange={(event) => setSelectedGame({ ...selectedGame, releaseDate: Number(event.target.value) })} />
            <label>IsActive :</label>
            <input type="checkbox" value={selectedGame?.isValidate?.toString() as string} onChange={(event) => setSelectedGame({ ...selectedGame, isValidate: Boolean(event.target.value) })} />
            <label>Added By</label>
            <input type="text" value={selectedGame?.authorId as string} readOnly />
            //TODO: OpenModal to confirm delete and delete
            <button>Delete</button>

            //TODO: Update
            <button>Update</button>
            <button onClick={closeGameModal}>Close</button>
          </Box>
        </Modal>


        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Select Location"
          isSearchable={true}
          name="color"
          options={allLocations.map((location) => { return { value: location.id, label: location.name } })}
          onChange={(value) => {
            setSelectedLocation(allLocations.find((location) => location.id === value?.value))
            openSelectedLocationModal()
          }}
        />
        <Modal
          open={locationModalOpen}
          onClose={closeSelectedLocationModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            //TODO: display Location informations and update them
          </Box>
        </Modal>


        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.5, ease: "circOut" },
          }}
          exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
          style={{ originX: isPresent ? 0 : 1 }}
          className="privacy-screen"
        />
      </div>
    </>
  );
};

export default AdminPage;

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const styles = {
  popupContainer: css`
    background-color: #5ab584;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  locationName: css`
    font-family: "Roboto";
    font-style: normal;
    font-size: 18px;
    color: white;
  `,

  mapContainer: css`
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `,
  flex: css`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `,
  wrapper: css`
    height: 100vh;
    background-color: #5ab584;
    padding: 20px;
  `,
  navBar: css`
    height: 20px;
    background-color: #74c499;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    display: flex;
    padding: 10px 30px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    z-index: 1;
    position: absolute;
    :hover {
      height: 200px;
    }
  `,
  topButton: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300px;
    font-size: 28px;
    line-height: 33px;
    align-self: flex-end;
    border-radius: 8px;
    padding: 10px;
    transition: 0.5s;
    :hover {
      background-color: #65aa85;
      cursor: pointer;
      transform: translateY(-5px);
    }
  `,
};

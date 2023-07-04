import React from 'react';
import { css, cx } from "@emotion/css";
import { motion, useIsPresent } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import { TopNavBar } from "../../components/TopNavBar/TopNavBar";
import { Button, IconButton, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { ServerConfiguration, CreateLocationDto, SearchedGameDto } from "@game-trip/ts-api-client";
import { AnnonymLocationController, AnnonymSearchController } from "../../utils/api/baseApi";
import { geoCodingApi } from "../../utils/api/geoCodingApi";
import { useUser } from "../../hooks/useUser";
import * as apiClient from "@game-trip/ts-api-client";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from 'react-select';
import PlacesAutocomplete, {
  Suggestion,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const inputStyle = {
  ml: 1,
  flex: 1,
  // on chrome autofill, dont change the background color
  "&:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
    backgroundColor: "white !important",
  },
  "&:-webkit-autofill:focus": {
    backgroundColor: "white !important",
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
  },
  "&:-webkit-autofill:hover": {
    backgroundColor: "white !important",
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
  },
  "&:-webkit-autofill:active": {
    transition: " background-color 5000s ease-in-out 0s",
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
    backgroundColor: "white !important",
  },
}
interface AddressInformation {
  address?: string;
  latitude: number;
  longitude: number;
}

export default function LocationForm(): JSX.Element {
  const isPresent = useIsPresent();
  const { isLogged, user } = useUser();
  const [newLocation, setNewLocation] = useState<CreateLocationDto>(new CreateLocationDto());
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  let LocationController = AnnonymLocationController;
  if (isLogged) {
    const config = apiClient.createConfiguration({
      baseServer: new ServerConfiguration(
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
  }




  const AddNewLocation = async () => {

    setNewLocation({ ...newLocation, authorId: user?.Id, longitude: 2.394485, latitude: 48.758371, description, name, })
    await LocationController.locationCreateLocationPost(true, newLocation)
      .then((res: apiClient.MessageDto) => console.log(res))
      .catch((err) => {
        if (err.code) {
          console.log("Error Code :", err.body.messageCode);
          console.log("Error Message :", err.body.message);
        } else
          console.log(err);
      })


  }


  const [gameSearchInput, setGameSearchInput] = useState<string>("");
  const [gameSearchOptions, setGameSearchOptions] = useState<SearchedGameDto[]>([]);
  const [selectedGames, setSelectedGames] = useState<SearchedGameDto[]>([]);

  useEffect(() => {
    const loadGamesOptions = async () => {
      const result = await AnnonymSearchController.searchSearchGameGet('');
      setGameSearchOptions(result);
    }
    loadGamesOptions();
  }, []);

  const handleSelectGame = (selected?: SearchedGameDto) => {
    if (!selected) {
      return;
    }
    if (selected) {
      setSelectedGames([...selectedGames, selected]);
    }
  }

  const [addressInformation, setAddressInformation] = useState({ name: "", latitude: 0, longitude: 0 });
  const handleChange = (address: string) => {
    setAddressInformation({ ...addressInformation, name: address });
  };
  const handleAddressSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results: any[]) => getLatLng(results[0]))
      .then((latLng: any) => {
        setAddressInformation({ name: address, latitude: latLng.lat, longitude: latLng.lng });
      })
      .catch((error: any) => console.error('Error', error));
  };

  return (
    <div className={styles.wrapper}>
      <TopNavBar showLoginButton={false} showHomeButton={true} />
      <div className={styles.basicText}>Submit a new point of interest</div>
      <div className={styles.formWrapper}>
        <div className={styles.side}>
          <div className={styles.fieldName}>Name</div>
          <div className={styles.formInput}>
            <InputBase
              autoComplete="off"
              aria-autocomplete="none"
              sx={inputStyle}
              placeholder="Place, monument..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.fieldName}>Related games</div>
          <div className={styles.tagList}>
            {selectedGames.map((game, idx) => <div className={styles.tag} key={idx}>
              <span>
                {game.name}
              </span>
              <div>
                <IconButton
                  type="button"
                  sx={{ p: "0px" }}
                  aria-label="arch"
                  onClick={() => {
                    setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </div>)}
          </div>
          <SearchInput
            value={gameSearchInput}
            onChange={setGameSearchInput}
            changeOnSelect={false}
            onSelect={handleSelectGame}
          />
        </div>
        <div className={styles.side}>
          <div className={styles.fieldName}>Address</div>
          <PlacesAutocomplete
            value={addressInformation.name}
            onChange={handleChange}
            onSelect={handleAddressSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
              return (
                <div>
                  <div className={styles.formInput}>
                    <InputBase
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                      autoComplete="off"
                      aria-autocomplete="none"
                      sx={inputStyle}
                      placeholder=""
                    />
                  </div>
                  <div className={cx("autocomplete-dropdown-container", styles.addrAutoComplete)}>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion: Suggestion) => {
                      // inline style for demonstration purpose
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div {...getSuggestionItemProps(suggestion)}
                          className={styles.dropDownElement}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            }}
          </PlacesAutocomplete>

          <div className={styles.fieldName}>Description</div>
          <InputBase
            multiline
            autoComplete="off"
            aria-autocomplete="none"
            placeholder="Description"
            className={styles.formMultiline}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.fieldName}>Pictures</div>
          <input type="file" multiple />
          <button onClick={AddNewLocation} className={styles.button}>
            <>
              POST
            </>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  );
}

const styles = {
  button: css`
    z-index: 1;
    // undo default button style
    border: none;
    outline: none;
    background: #84deae;
    cursor: pointer;
    // custom style
    font-family: "Roboto";
    font-style: normal;
    font-size: 28px;
    line-height: 33px;
    border-radius: 8px;
    padding: 10px;
    transition: 0.5s;
    width: 100%;
    :hover {
      cursor: pointer;
      filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
    }
    :active {
      background: #538e6f;
    }
    
    margin-top: 10px;
  `,
  addrAutoComplete: css`
    position: inherit;
    z-index: 10000;
  `,
  formMultiline: css`
    background-color: #ffffff;
    width: 100%;
    border-radius: 8px;
  `,
  dropDownElement: css`
    width: 100%;
    border-radius: 8px;
    background-color: #ffffff;
    color: black;
    padding: 10px;
    transition: 0.5s;
    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
      transform: translateX(-5px);

    }
    margin-top: 10px;
    z-index: 10000;
  `,
  dropDown: (isFocused: boolean) => css`
    opacity: ${isFocused ? 1 : 0};
    visibility: ${isFocused ? "visible" : "hidden"};
    transition: 0.5s;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    height: 80%;
    transition: 0.5s;
    z-index: 10000;
    top: 100%;
  `,
  side: css`
    width:50%;
  `,
  tagList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom:10px;
  `,
  tag: css`
    background: #85d8ac;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px;
    border-radius: 8px;
    `,
  wrapper: css`
    display: flex;
    flex-direction: column;
        background: #74c499;
        height: 200vh;
  `,
  fieldName: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    /* center to the middle */
    align-self: start;
    margin-top: 20px;
  `,
  basicText: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    /* center to the middle */
    align-self: center;
  `,
  formWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px 20px;
  `,
  formInput: css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 0px 4px;
    border-radius: 8px;
    background-color: #ffffff;
    transition: 0.5s;

    &:focus-within {
      transform: translateY(-5px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `,
  searchBar: css`
    /* horizontally center */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  `,
  body: css`
    background-color: #5ab584;
    width: 100%;
    flex-grow: 1;
    display: flex;
    // rows
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 120px;
  `,
  image: css`
    background-color: transparent;
    z-index: 1;
    -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    width: 50%;
  `,

  topBar: css`
    border-bottom: 5px solid #85d8ac;
    background-color: #74c499;
    height: 100px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    /* center elements */
    padding: 10px 30px;
    /* space betseen */
    gap: 40px;
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
    /* on hover */
    :hover {
      background-color: #65aa85;
      cursor: pointer;
      /* move to top */
      transform: translateY(-5px);
    }
  `,
};

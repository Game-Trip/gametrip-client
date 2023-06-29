import React, { memo, useMemo, useState,useRef ,useCallback} from "react";
import { css } from "@emotion/css";
import { motion, useIsPresent } from "framer-motion";
import { Layer, Map, MapRef, Marker, Popup, ViewState } from "react-map-gl";
import { CollapsableNavBar } from "../../components/CollapsableNavBar/CollapsableNavBar";
import { LocationController, SearchController } from "../../utils/api/baseApi";
import Pin from "../../components/Pin/Pin";
import "mapbox-gl/dist/mapbox-gl.css";
import SelectionModal from "../../components/SelectionModal/SelectionModal";
import { LocationDto, SearchedGameDto } from "@game-trip/ts-api-client";

const MapPage = () => {
  const isPresent = useIsPresent();
  const [locationsData, setLocationsdata] = useState<LocationDto[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<
    LocationDto | undefined
  >();
  const [availableGames, setAvailableGames] = useState<SearchedGameDto[]>([]);
  const handleSearch = useCallback(async (search: string) => {

    mapRef.current?.flyTo({ duration: 2000, zoom: 0});
    
    const result = await SearchController.searchSearchGameGet(search);
    setAvailableGames(result);
    return;
  },[]);

  const closeSelectionModal = () => setSelectedLocation(undefined);

  const [selectedGame, setSelectedGame] = useState<SearchedGameDto | undefined>()
  const mapRef = useRef<MapRef>() as React.RefObject<MapRef>;

  const pins = useMemo(() => {
    if(selectedGame && selectedGame.locations) {
      return selectedGame.locations.map((location: LocationDto, index) => {
            return (
              <Marker
              offset={[12, -10]}
              rotationAlignment="viewport"
              key={`marker-${index}`}
              longitude={location.longitude}
              latitude={location.latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedLocation(location);
              }}
              >
            <Pin />
            </Marker>
          )
    }
      );
    }
    return locationsData.map((location: LocationDto, index) => {
          return (
            <Marker
            offset={[12, -10]}
            rotationAlignment="viewport"
            key={`marker-${index}`}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(location);
              mapRef.current?.flyTo({ duration: 2000, zoom: 6,
                center: [location?.longitude!, location?.latitude!],              
              });
            }}
            >
          <Pin />
          </Marker>
        )
   
  }
    );
  }, [locationsData,selectedGame]);

  React.useEffect(() => {
    const fetchLocations = async () => {
      const result: LocationDto[] = await LocationController.locationGet();
      setLocationsdata(result);
    };
    fetchLocations();
  }, []);
  
  return (
    <>
      <CollapsableNavBar onSearch={handleSearch} availableGames={availableGames} onSelectGame={(selected)=>setSelectedGame(selected)} />
      <div className={styles.wrapper}>
        <div className={styles.mapContainer}>
            <Map
              ref={mapRef}
              initialViewState={{
                latitude: 48.8588443,
                longitude: 2.2943506,
                zoom: 0,
                bearing: 0,
              }}
              minZoom={2}
              mapStyle="mapbox://styles/antoinegx/clha9331i011601p6dsogffh8"
              mapboxAccessToken="pk.eyJ1IjoiYW50b2luZWd4IiwiYSI6ImNsYWppMjNxeTBjYWszcHJxMWtkNG50d2MifQ.AD21JR1hyg8ed2DeN3l97w"
              attributionControl={false}
              style={{
                width: "100%",
                height: "100%",
              }}
              
            >
              {pins}
            </Map>
          
        </div>

        <SelectionModal
          closeSelectionModal={closeSelectionModal}
          selectedLocation={selectedLocation}
        />

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

export default memo(MapPage);
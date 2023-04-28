import React from "react";
import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import { motion, useIsPresent } from "framer-motion";
import { Link } from "react-router-dom";
import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
import { InputBase, IconButton } from "@mui/material";
interface Props {}

export default function MapPage({}: Props) {
  const isPresent = useIsPresent();
  const initialViewState = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    pitch: 45,
    bearing: 0,
  };

  const data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.4194, 37.7749],
        },
        properties: {
          name: "San Francisco",
        },
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.navBar}>
          <Link
            className={styles.topButton}
            style={{ textDecoration: "none", color: "white" }}
            to={"/"}
          >
            <span>Home</span>
          </Link>
          <div
            className={css`
              display: flex;
              align-items: center;
              width: 30%;
              height: 45px;
              padding: 0px 4px;
              border-radius: 8px;
              background-color: #ffffff;

              /* on focus, move up */
              transition: 0.5s;
              &:focus-within {
                width: 35%;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              }
            `}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Battlefield 2042, Call of Duty, ..."
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div id="mapWrapper" className={styles.mapWrapper}>
            <Map
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14,
              }}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxAccessToken="pk.eyJ1IjoiYW50b2luZWd4IiwiYSI6ImNsYWppMjNxeTBjYWszcHJxMWtkNG50d2MifQ.AD21JR1hyg8ed2DeN3l97w"
              attributionControl={false}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
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
  mapWrapper: css`
    width: 97%;
    height: 95%;
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
  `,
  navBar: css`
    background-color: #74c499;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    display: flex;
    padding: 30px 30px 10px 30px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    z-index: 1;
    position: relative;
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
  basicText: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    /* center to the middle */
    align-self: center;
  `,
};

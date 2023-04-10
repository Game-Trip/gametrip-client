import React from "react";
import { css } from "@emotion/css";

import { motion, useIsPresent } from "framer-motion";
import { Link } from "react-router-dom";
import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
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
          <span className={styles.topButton}>
            <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
              Home
            </Link>
          </span>
        </div>
        <div
          style={{
            flexGrow: 1,
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
    width: 95%;
    height: 85%;
    margin: auto;
    transform: translate(0, 9%);
    border-radius: 10px;
    /* can't see border radius */
    overflow: hidden;
    
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
    height: 115px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    height: 115px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    padding: 0px 0px 20px 40px;
    gap: 40px;
    z-index: 1;
  `,
  topButton: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
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

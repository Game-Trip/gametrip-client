import React from "react";
import { css } from "@emotion/css";

import { motion, useIsPresent } from "framer-motion";
import { Link } from "react-router-dom";
import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import StaticMap, { Map } from "react-map-gl";
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

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [255, 140, 0, 128],
    getLineColor: [255, 140, 0, 128],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  });

  return (
    <>
      <div className={styles.navBar}>
        <span className={styles.topButton}>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            Home
          </Link>
        </span>
      </div>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[layer]}
      >
        <Map
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken="pk.eyJ1IjoiYW50b2luZWd4IiwiYSI6ImNsYWppMjNxeTBjYWszcHJxMWtkNG50d2MifQ.AD21JR1hyg8ed2DeN3l97w"
        />
      </DeckGL>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </>
  );
}
const styles = {
  navBar: css`
    position: absolute;
    background-color: #74c499;
    top: 0;
    left: 0;
    width: 100%;
    height: 115px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    height: 115px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    /* center elements */
    padding: 0px 0px 20px 40px;
    /* space betseen */
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

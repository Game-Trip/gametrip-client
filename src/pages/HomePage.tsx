import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Alignment, Button, Icon, InputGroup, Navbar } from "@blueprintjs/core";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import { css } from "@emotion/css";
// import styles
import "./styles.css";
import logo from "./logo-no-background.png";
import { useMediaQuery } from "react-responsive";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(min-width: 800px)" });
  const [isInputFocused, setIsInputFocused] = useState(false);
  return (
    <>
      {isDesktopOrMobile ? (
        <div className={styles.body}>
          <div className={styles.topBar}>
            <span className={styles.topButton}>Trending</span>
            <span className={styles.topButton}>Map</span>
            <span className={styles.topButton}>Profile</span>
          </div>
          <img className={styles.image} src={logo} />

          <div className={styles.footer}>
            <div className={styles.searchSection}>
              <div className={styles.basicText}>Search for a game</div>

              <TextField
                className={styles.searchBar}
                // disable animation
                variant="filled"
                onFocus={() => {
                  setIsInputFocused(!isInputFocused);
                }}
                onBlur={() => {
                  setIsInputFocused(!isInputFocused);
                }}
                InputProps={{
                  style: {
                    backgroundColor: "white",
                    borderRadius: "8px 8px 0px 0px",
                    width: isInputFocused ? "70%" : "68%",
                    transition: "width 0.5s",
                    margin: "auto",
                    // on focus
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>
          </div>
        </div>
      ) : (
        <IonToolbar>
          <IonTitle>Mobile view</IonTitle>
        </IonToolbar>
      )}
    </>
  );
};

const styles = {
  searchBar: css`
    /* horizontally center */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  `,
  searchSection: css`
    background-color: #61ba8c;
    height: 130px;
    padding: 20px;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.35);
    width: 60%;
    /* center */
    position: absolute;
    left: 50%;
    transform: translate(-50%, -65%);
    border-radius: 8px;
    display: flex;
    /* center elements */
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  `,
  body: css`
    background-color: #5ab584;
    width: 100%;
    height: 100%;
  `,
  image: css`
    background-color: transparent;
    z-index: 1;
    /* center */
    position: absolute;
    width: 60%;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  `,
  footer: css`
    height: 200px;
    width: 100%;
    background-color: #74c499;
    /* fix to bottom */
    position: absolute;
    bottom: 0;
    z-index: 1;
    border-top: 25px solid #85d8ac;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  `,
  topBar: css`
    border-bottom: 5px solid #85d8ac;
    background-color: #74c499;
    height: 115px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    /* center elements */
    justify-content: center;
    padding: 20px;
    /* space betseen */
    gap: 40px;
  `,
  topButton: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    /* align to bottom */
    align-self: flex-end;
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

export default HomePage;

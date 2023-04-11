import { IonTitle, IonToolbar } from "@ionic/react";
import { css } from "@emotion/css";
import InputBase from "@mui/material/InputBase";
import { motion, useIsPresent } from "framer-motion";
import "../styles.css";
import logo from "../logo-no-background.png";
import { useMediaQuery } from "react-responsive";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const isPresent = useIsPresent();

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.topBar}>
          <span className={styles.topButton}>Trending</span>
          <span className={styles.topButton}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/map"}
            >
              Map
            </Link>
          </span>
          <span className={styles.topButton}>Profile</span>
        </div>
        <img className={styles.image} src={logo} />

        <div className={styles.footer}>
          <div className={styles.searchSection}>
            <div className={styles.basicText}>Recherchez un jeu</div>
            <div
              className={css`
                display: flex;
                align-items: center;
                width: 70%;
                margin: auto;
                padding: 0px 4px;
                border-radius: 8px;
                background-color: #ffffff;

                /* on focus, move up */
                transition: 0.5s;
                &:focus-within {
                  transform: translateY(-5px);
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
};

const styles = {
  wrapper: css`
    height: 100vh;
  `,
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
    box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
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
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  `,
  topBar: css`
    border-bottom: 5px solid #85d8ac;
    background-color: #74c499;
    height: 100px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    /* center elements */
    justify-content: center;
    padding: 10px;
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

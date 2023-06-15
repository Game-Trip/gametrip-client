import React, { useRef } from "react";
import { css } from "@emotion/css";
import { motion, useIsPresent } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo-no-background.png";
import { InputBase, IconButton, Snackbar, Alert, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { StarLikeComponent } from "../../components/Like/StarLikeComponent";
interface Props {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Component({
    isLogged,
    setIsLogged,
}: Props): JSX.Element {
    const isPresent = useIsPresent();
    const pwdRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    return (
        <div className={styles.wrapper}>
            <div id="topBar" className={styles.topBar}>
                <Link
                    className={styles.topButton}
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/"}
                >
                    <span>Home</span>
                </Link>
                <Link
                    className={styles.topButton}
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/map"}
                >
                    <span>Map</span>
                </Link>
            </div>
            <div id="body" className={styles.body}>
                <StarLikeComponent />
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
    loginButton: css`
    // undo default button style
    border: none;
    outline: none;
    background: #74c499;
    cursor: pointer;
    // custom style
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300px;
    font-size: 28px;
    line-height: 33px;
    border-radius: 8px;
    padding: 10px;
    transition: 0.5s;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
    width: 100%;
    :hover {
      cursor: pointer;
      filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
    }
    :active {
      background: #538e6f;
    }
  `,
    fieldName: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    /* center to the middle */
    align-self: start;
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
    formWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
    formInput: css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 0px 4px;
    border-radius: 8px;
    background-color: #ffffff;

    /* on focus, move up */
    transition: 0.5s;

    &:focus-within {
      transform: translateY(-5px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `,
    wrapper: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
    searchBar: css`
    /* horizontally center */
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  `,
    loginSection: css`
    background-color: #61ba8c;
    height: 90%;
    padding: 20px 30px;
    box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    width: 30%;
    border-radius: 8px;
    // center vertically
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

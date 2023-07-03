import React, { useRef } from "react";
import { css } from "@emotion/css";
import { motion, useIsPresent } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../logo-no-background.png";
import { InputBase, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useUser } from "../../hooks/useUser";
import { TopNavBar } from "../../components/TopNavBar/TopNavBar";

export default function Component(): JSX.Element {
  const isPresent = useIsPresent();
  const { onLogin } = useUser();
  const pwdRef = useRef<HTMLInputElement>(null);

  const [userAuth, setUserAuth] = React.useState({
    username: "",
    password: "",
  });

  const [isPwdVisible, setIsPwdVisible] = React.useState(false);

  const handleLogin = async () =>
    await onLogin(userAuth.username, userAuth.password);

  return (
    <div className={styles.wrapper}>
      <TopNavBar showLoginButton={false} showHomeButton={false} />
      <div id="body" className={styles.body}>
        <img className={styles.image} src={logo} />

        <div className={styles.loginSection}>
          <div className={styles.formWrapper}>
            <span className={styles.basicText}>Authenticate</span>
            <span className={styles.fieldName}>E-mail</span>
            <div className={styles.formInput}>
              <InputBase
                autoComplete="off"
                aria-autocomplete="none"
                sx={{
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
                }}
                onChange={(val) => {
                  setUserAuth({ ...userAuth, username: val.target.value });
                }}
                placeholder="E-mail"
              />
            </div>
            <span className={styles.fieldName}>Password</span>
            <div className={styles.formInput}>
              <InputBase
                ref={pwdRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Password"
                type={isPwdVisible ? "text" : "password"}
                onChange={(val) => {
                  setUserAuth({ ...userAuth, password: val.target.value });
                }}
              />
              <IconButton
                onClick={() =>
                  isPwdVisible ? setIsPwdVisible(false) : setIsPwdVisible(true)
                }
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                {isPwdVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/forgot-password"
            >
              Forgot Password ?
            </Link>
            <button onClick={handleLogin} className={styles.loginButton}>
              <span>Login</span>
            </button>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/register"
            >
              Not registered yet ?
            </Link>
          </div>
        </div>
      </div>
      {/* <Snackbar
        open={snackBarInfo.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarInfo({ ...snackBarInfo, isOpen: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackBarInfo.isError ? "error" : "success"}>
          {snackBarInfo.message}
        </Alert>
      </Snackbar> */}
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
    background-color: #74c499;
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

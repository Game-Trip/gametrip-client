import { css } from "@emotion/css";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import ProfileButton from "../ProfileButton/ProfileButton";

interface Props {
  showHomeButton?: boolean;
  showLoginButton?: boolean;
}
export const TopNavBar = ({
  showHomeButton = true,
  showLoginButton = true,
}: Props) => {
  const { isLogged } = useUser();
  const isDev = true;

  return (
    <div className={styles.wrapper}>
      {!showHomeButton && (
        <Link
          className={styles.topButton}
          style={{ textDecoration: "none", color: "white" }}
          to={"/"}
        >
          <span>Home</span>
        </Link>
      )}
      <Link
        className={styles.topButton}
        style={{ textDecoration: "none", color: "white" }}
        to={"/map"}
      >
        <span>Map</span>
      </Link>
      {!isLogged && showLoginButton && (
        <Link
          className={styles.topButton}
          style={{ textDecoration: "none", color: "white" }}
          to={"/login"}
        >
          <span>Login</span>
        </Link>
      )}
      {isLogged && <div className={styles.mlauto}><ProfileButton /></div>
      }
    </div>
  );
};

const styles = {
  mlauto: css`
    margin-left: auto;
  `,
  userButton: css`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  wrapper: css`
    border-bottom: 5px solid #85d8ac;
    background-color: #74c499;
    height: 80px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    padding: 10px 30px;
    gap: 20px;
    /* center vertically all */
    display: flex;
    justify-content: center;
    align-items: center;
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
    /* center vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  basicText: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    align-self: center;
  `,
};

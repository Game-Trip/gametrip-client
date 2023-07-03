import React from "react";
import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button2 } from "../Button/Button2";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useUser } from "../../hooks/useUser";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useOnClickOutside } from "usehooks-ts";
import SearchInput from "../SearchInput/SearchInput";
import { SearchedGameDto } from "@game-trip/ts-api-client";
interface Props {
  onSearch: (search: string) => void;
  availableGames?: SearchedGameDto[];
  onSelectGame: (game?: SearchedGameDto) => void;
}
export const CollapsableNavBar = ({ onSearch, availableGames, onSelectGame }: Props) => {
  const navBarRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(true);
  const [isoverFlowHidden, setIsOverFlowHidden] = React.useState(true);

  const { isLogged, isAdmin } = useUser();

  useOnClickOutside(navBarRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      <Button2
        onClick={() => setIsOpen(true)}
        className={styles.menuButton(isOpen)}
      >
        <KeyboardArrowDownIcon />
      </Button2>
      <div ref={navBarRef} className={styles.navBar(isOpen, isoverFlowHidden)}>
        <Button isRouterButton to="/">
          Home
        </Button>
        {!isLogged && (
          <Button isRouterButton to="/login">
            Login
          </Button>
        )}
        {isLogged && isAdmin && (
          <Button isRouterButton to="/AdminPanel">
            Admin Panel
          </Button>
        )}
        <div className={styles.inputWrapper}>
          <SearchInput onChange={onSearch} options={availableGames} onSelect={onSelectGame} />
        </div>
        {isLogged && <ProfileButton />}
      </div>
    </>
  );
};

const styles = {
  inputWrapper: css`
  width: 30%;
  margin-left: auto;
  `,
  userButton: css`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  menuText: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300px;
    font-size: 24px;
    color: #ffffff;
    display: flex;
    align-items: center;
  `,
  menuButton: (isOpen: boolean) => css`
    position: absolute;
    /* center horizontally */
    z-index: 2;
    left: 60px;
    top: 0px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    opacity: ${isOpen ? 0 : 100};
    padding: 5px;
    height: 34px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    flex-direction: row;
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
  navBar: (isOpen: boolean, isoverFlowHidden: boolean) => css`
    height: 80px;
    top: ${isOpen ? 0 : -75}px;
    background-color: #74c499;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    display: flex;
    padding: ${isOpen ? 30 : 0}px 30px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    z-index: 3;
    position: absolute;
    transition: 1s;
    /* opacity: ${isOpen ? 100 : 0}; */
  `,
};

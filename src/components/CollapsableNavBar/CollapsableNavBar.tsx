import React, { useCallback } from "react";
import { css } from "@emotion/css";
import { Button } from "../Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button2 } from "../Button/Button2";
import { useUser } from "../../hooks/useUser";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useOnClickOutside } from "usehooks-ts";
import SearchInput from "../SearchInput/SearchInput";
import { isConfirmedUser, isLoggedIn } from "../../utils/Auth";
import { SearchedGameDto } from "../../utils/Models/Search/SearchGamesDto";
interface Props {
  searchValue: string,
  onSearch: (search: string) => void;
  onSelectGame: (game?: SearchedGameDto) => void;
}
export const CollapsableNavBar = ({ onSearch, onSelectGame, searchValue }: Props) => {
  const navBarRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(true);

  const isLogged = isLoggedIn();
  const isUser = isConfirmedUser();

  useOnClickOutside(navBarRef, () => {
    setIsOpen(false);
  });

  const handleSelectGame = useCallback((game?: SearchedGameDto) => {
    onSelectGame(game);
  }, [onSelectGame]);

  const handleChange = (search: string) => {
    onSearch(search);
  };
  return (
    <div className={styles.wrapper}>
      <Button2
        onClick={() => setIsOpen(true)}
        className={styles.menuButton(isOpen)}
      >
        <KeyboardArrowDownIcon />
      </Button2>
      <div ref={navBarRef} className={styles.navBar(isOpen)}>
        <Button isRouterButton to="/">
          Home
        </Button>
        {isLogged && (
          <Button to="/newlocation" className={styles.mlauto}>Submit new location</Button>
        )}
        <div className={styles.inputWrapper}>
          <SearchInput onChange={handleChange} onSelect={handleSelectGame} value={searchValue} />
        </div>

        {isLogged ? <ProfileButton /> : <Button to="/login" >Login</Button>}
      </div>
    </div>
  );
};

const styles = {
  mlauto: css`
  margin-left: auto;
  `,
  inputWrapper: css`
  width: 30%;
  margin-left: auto;
}
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
    top: -5px;
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
  `,
  wrapper: css`
    background-color: #5ab584;
    width:100%;
  `,
  navBar: (isOpen: boolean) => css`
    top: ${isOpen ? 0 : -75}px;
    background-color: #74c499;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-bottom: 5px solid #85d8ac;
    display: flex;
    padding: ${isOpen ? 5 : 0}px 15px;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    z-index: 3;
    position: absolute;
    transition: 1s;
    /* opacity: ${isOpen ? 100 : 0}; */
  `,
};

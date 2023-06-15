import React from "react";
import { css } from "@emotion/css";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button2 } from "../Button/Button2";

export const CollapsableNavBarPhone = () => {


    const navigate = (path: string) => () => {
        // navigate to path
        window.location.href = path;
    };
    const navBarRef = React.useRef<HTMLDivElement>(null);
    const searchBarRef = React.useRef<HTMLDivElement>(null);
    const menuButtonRef = React.useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    //   onClick outside of navbar or searchbar, close navbar
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navBarRef.current &&
                !navBarRef.current.contains(event.target as Node) &&
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navBarRef, searchBarRef]);

    return (
        <>
            <h1>Phone</h1>
            {/* <Button2
                onClick={() => setIsOpen(true)}
                className={styles.menuButton(isOpen)}
            >
                <KeyboardArrowDownIcon />
            </Button2>
            <div ref={navBarRef} className={styles.navBar(isOpen)}>
                <Button isRouterButton to="/">
                    Phone
                </Button>
                <div
                    className={css`
            display: flex;
            align-items: center;
            width: 30%;
            height: 45px;
            padding: 0px 4px;
            border-radius: 8px;
            background-color: #ffffff;
            transition: 0.5s;
            &:focus-within {
              width: 35%;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
          `}
                >
                    <InputBase
                        ref={searchBarRef}
                        sx={{
                            ml: 1,
                            flex: 1,
                            backgroundColor: "#ffffff",
                            "&:hover": {
                                backgroundColor: "#ffffff0",
                            },
                        }}
                        placeholder="Battlefield 2042, Call of Duty, ..."
                    />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
            </div> */}
        </>
    );
};

const styles = {
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
    navBar: (isOpen: boolean) => css`
    height: ${isOpen ? 80 : 0}px;
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
    overflow: hidden;
  `,
};

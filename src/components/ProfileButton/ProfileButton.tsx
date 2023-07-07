import { css } from "@emotion/css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useUser } from "../../hooks/useUser";
import Localize from "../Translations/TranslationConext";


export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { onLogout } = useUser();
  const localize = Localize();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.userButton}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{localize.translate("Profil.bt")}</MenuItem>
        <MenuItem onClick={handleClose}>{localize.translate("Profil.Params")}</MenuItem>
        <MenuItem onClick={onLogout}>{localize.translate("Profil.Logout")}</MenuItem>
      </Menu>
    </div>
  );
}

const styles = {
  userButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

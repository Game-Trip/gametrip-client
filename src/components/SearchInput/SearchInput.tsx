import React from "react";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ onChange, value }: Props) {
  return (
    <div className={styles.wrapper}>
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Battlefield 2042, Call of Duty, ..."
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}

const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    width: 70%;
    border-radius: 8px;
    background-color: #ffffff;
    transition: 0.5s;
    /* take all left space */
    width: 100%;
    flex: 1;
    &:focus-within {
      transform: translateY(-5px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `,
};

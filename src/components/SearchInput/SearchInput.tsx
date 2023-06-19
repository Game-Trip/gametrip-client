import React, { useEffect, useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/css";
import { useDebounce } from "usehooks-ts";
import { SearchedGameDto } from "@game-trip/ts-api-client";

type Props = {
  onChange: (search: string) => void;
  options?: SearchedGameDto[]
};

export default function SearchInput({ onChange, options }: Props) {
  const [value, setValue] = useState<string>("");
  const debounced = useDebounce(value, 500);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  console.log(options)
  useEffect(() => {
    onChange(value);
  }, [debounced]);
  return (
    <div className={styles.wrapper}>
      <>
        <InputBase
          ref={inputRef}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Battlefield 2042, Call of Duty, ..."
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </>

      <div className={styles.dropDown(isFocused)}>
        {options?.map((option) => <div className={styles.dropDownElement}>{option.name}</div>)}
      </div>
    </div>
  );
}

const styles = {
  dropDownElement: css`
    width: 50%;
    border-radius: 8px;
    background-color: #ffffff;
    color: black;
    padding: 10px;
  `,
  dropDown: (isFocused: boolean) => css`
    opacity: ${isFocused ? 1 : 0};
    transition: 0.5s;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    top: 100%;
    margin-top: 10px;
    width: 100%;
    transition: 0.5s;
    z-index: 10000;
  `,
  wrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    background-color: #ffffff;
    transition: 0.5s;
    /* take all left space */
    flex: 1;
    &:focus-within {
      transform: translateY(-5px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `,
};

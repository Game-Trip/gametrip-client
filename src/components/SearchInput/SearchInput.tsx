import React, { useEffect, useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/css";
import { SearchedGameDto } from "@game-trip/ts-api-client";
import { AnnonymSearchController } from "../../utils/api/baseApi";

type Props = {
  value: string,
  onChange: (search: string) => void;
  onSelect: (option?: SearchedGameDto) => void;
  changeOnSelect?: boolean;
};

export default function SearchInput({ changeOnSelect, value, onChange, onSelect }: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [options, setOptions] = useState<SearchedGameDto[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const result = await AnnonymSearchController.searchSearchGameGet('');
      setOptions(result);
    };
    fetchGames();
  }, []);

  const filteredOptions = options?.filter((option) => option.name?.toLowerCase().includes(value.toLowerCase()));

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.dropDown(isFocused)}>
        {filteredOptions?.map((option) => <div key={option.name} onClick={() => {
          onSelect(option);
          if (option.name && changeOnSelect) {
            onChange(option.name);
          }
        }} className={styles.dropDownElement}>{option.name}</div>)}
      </div>
      <>
        <InputBase
          ref={inputRef}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          sx={{ ml: 1, flex: 1, width: "100%" }}
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
    </div>
  );
}

const styles = {
  inputWrapper: css`
    display: flex;
    flex: 1;
  `,
  dropDownElement: css`
    width: 100%;
    border-radius: 8px;
    background-color: #ffffff;
    color: black;
    padding: 10px;

    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    z-index: 10000;
  `,
  dropDown: (isFocused: boolean) => css`
    transition: 0.1s;    visibility: ${isFocused ? "visible" : "hidden"};
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    z-index: 10000;
    top: 100%;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 8px;
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
    &:focus-within {
      transform: translateY(-5px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  `,
};

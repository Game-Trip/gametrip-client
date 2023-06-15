import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { ApiLocation } from "../../pages/Map/MapPage";
import { IconButton } from "@mui/material";
import { css } from "@emotion/css";
import React from "react";

type Props = {
    selectedLocation?: ApiLocation;
    closeSelectionModal: () => void;
};

export default function SelectionModalPhone({
    selectedLocation,
    closeSelectionModal,
}: Props) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const isOpen = !!selectedLocation;
    return (
        <div className={styles.wrapper(isExpanded, isOpen)}>
            <div className={styles.header}>
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </IconButton>
                <h1>Phone</h1>
                <IconButton onClick={closeSelectionModal}>
                    <CloseIcon />
                </IconButton>
            </div>
            {selectedLocation?.name}
            {selectedLocation?.city}
        </div>
    );
}

const styles = {
    header: css`
    height: 40px;
    display: flex;
    justify-content: space-between;
  `,
    wrapper: (isExpanded: boolean, isOpen: boolean) => css`
    position: fixed;
    bottom: 0;
    right: 0;
    height: ${isOpen ? "80%" : "0px !important"};
    opacity: ${isOpen ? 100 : 0};
    height: ${isExpanded ? "100%" : "80%"};
    width: ${isExpanded ? "100%" : "400px"};
    padding: 10px;
    background-color: #5ab584;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: 0.5s ease-in-out;
  `,
};

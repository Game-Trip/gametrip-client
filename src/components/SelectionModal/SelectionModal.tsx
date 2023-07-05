import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { css } from "@emotion/css";
import React, { useEffect } from "react";
import GameDetail from "../GameDetail/GameDetail";
import { LocationApi } from "../../utils/api/LocationApi";
import { LocationDto } from "../../utils/Models/Location/LocationDto";

type Props = {
  selectedLocation?: LocationDto;
  closeSelectionModal: () => void;
};

export default function SelectionModal({
  selectedLocation,
  closeSelectionModal,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [locationDto, setLocationDto] = React.useState<LocationDto>();
  const isOpen = !!selectedLocation;
  useEffect(() => {
    const getLocationDto = async () => {
      if (!selectedLocation || !selectedLocation.id) {
        return;
      }
      const result = await LocationApi.getLocationById(selectedLocation.id);
      //TODO: CHECK RESPONSE

      setLocationDto(result.data);
    };
  }, []);
  return (
    <div className={styles.wrapper(isExpanded, isOpen)}>
      <div className={styles.header}>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
        <div className={styles.locationName}>
          {selectedLocation?.name}
        </div>
        <IconButton onClick={closeSelectionModal}>
          <CloseIcon />
        </IconButton>
      </div>
      {
        isExpanded && (
          <GameDetail locationDto={locationDto} />
        )
      }

    </div>
  );
}

const styles = {
  locationName: css`
    font-size: 40px;
    font-weight: bold;
    text-align: center;

  `,
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
    height: ${isExpanded ? "100%" : "70px"};
    width: ${isExpanded ? "100%" : "400px"};
    padding: 10px;
    background-color: #5ab584;
    border-radius: ${isExpanded ? 0 : 10}px 0px 0px 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: 0.5s ease-in-out;
  `,
};

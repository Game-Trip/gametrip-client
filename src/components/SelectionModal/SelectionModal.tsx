import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { css } from "@emotion/css";
import React, { useEffect } from "react";
import { LocationDto } from "@game-trip/ts-api-client";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../../hooks/useUser";
import axios, { AxiosResponse } from "axios";
import LocationDetail from "../LocationDetail/LocationDetail";

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
  const { user } = useUser();
  useEffect(() => {
    if (!selectedLocation) {
      return;
    }
    axios.get(`https://staging-api.game-trip.fr/Location/id/${selectedLocation.id}`)
      .then((response: AxiosResponse) => {
        setLocationDto(response.data);
        console.log(response.data);
      });
  }, [selectedLocation]);
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
          <LocationDetail locationDto={locationDto} />
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
    width: ${isExpanded ? "100%" : "550px"};
    padding: 10px;
    background-color: #5ab584;
    border-radius: ${isExpanded ? 0 : 10}px 0px 0px 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: 0.5s ease-in-out;
  `,
};

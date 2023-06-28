import { css } from "@emotion/css";
import { Icon } from "@blueprintjs/core";
import './NewLocation.css'
import { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Form } from "react-router-dom";


export default function AddLocationComponent() {
  const [isModalOpen, setIsModelOpen] = useState(true);

  const OpenAddLocationModal = () => {
    setIsModelOpen(!isModalOpen)
  }

  const CloseAddLocationModal = () => {
    setIsModelOpen(!isModalOpen)
  }


  return (
    <>
      {!isModalOpen && <Icon iconSize={30} icon="add" className="addNewLocationButton" onClick={OpenAddLocationModal} />}
      {isModalOpen && <div className="addLocationModal">

        <IconButton onClick={CloseAddLocationModal}>
          <CloseIcon />
        </IconButton>

        <div className="Content">
          <form>
            <div className="title">
              <label>Title</label>
              <input type="text" placeholder="Title Of Location" />
            </div>
            <div className="locationAddress">
              <label>Address</label>
              <input type="text" placeholder="Address Of Location" />
            </div>
            <div className="description">
              <label>Description</label>
              <textarea placeholder="Description Of Location" />
            </div>
            <div className="locationPictures">
              <label>Location Pictures</label>
              <input type="file" multiple />
            </div>

            <div className="gameList">
              <label>Game List</label>
              <input type="text" placeholder="Game List" />
            </div>

          </form>
        </div>
      </div>}
    </>
  );
};

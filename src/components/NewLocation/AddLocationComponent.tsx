import { Icon } from "@blueprintjs/core";
import './NewLocation.css'
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputBase } from "@mui/material";
import { CreateLocationDto } from "@game-trip/ts-api-client";

import * as apiClient from "@game-trip/ts-api-client";
import { ServerConfiguration } from "@game-trip/ts-api-client";
import { useUser } from "../../hooks/useUser";
import { AnnonymLocationController } from "../../utils/api/baseApi";
import { HttpStatusCode } from "axios";
import { geoCodingApi } from "../../utils/api/geoCodingApi";


interface AddressInformation {
  address: string;
  latitude: number;
  longitude: number;
}

export default function AddLocationComponent() {
  const userContext = useUser();



  //Configure the controller to use the user token if logged ele configure it to use the annonynm controller
  let LocationController = AnnonymLocationController;
  if (userContext.isLogged) {
    const config = apiClient.createConfiguration({
      baseServer: new ServerConfiguration<{}>(
        "https://staging-api.game-trip.fr",
        {}
      ),
      authMethods: {
        'Bearer': {
          'tokenProvider': {
            getToken() {
              return userContext.user?.jwt;
            },
          }
        } as apiClient.HttpBearerConfiguration
      } as apiClient.AuthMethodsConfiguration,
    });
    LocationController = new apiClient.LocationApi(config);
  }


  const [isModalOpen, setIsModelOpen] = useState(true);

  const [newLocation, setNewLocation] = useState<CreateLocationDto>(new CreateLocationDto())
  const [searchAddress, setSearchAddress] = useState<string>("")
  const [addressResult, setAddressResult] = useState<AddressInformation>()


  const GetAddressInformation = async () => {
    var result = await geoCodingApi.getAddressInformation(searchAddress);
    if (result.status != 200)
      return console.error(result);

    setAddressResult({
      address: result.data.features[0].properties.formatted,
      latitude: result.data.features[0].properties.lat,
      longitude: result.data.features[0].properties.lon
    })


  }

  const AddNewLocation = async () => {

    setNewLocation({ ...newLocation, latitude: 48.758371 })
    setNewLocation({ ...newLocation, longitude: 2.394485 })


    setNewLocation({ ...newLocation, authorId: userContext.user?.Id })
    await LocationController.locationCreateLocationPost(true, newLocation)
      .then((res: apiClient.MessageDto) => console.log(res))
      .catch((err) => {
        if (err.code === HttpStatusCode.BadRequest) {
          console.log("Error Code :", err.body.messageCode);
          console.log("Error Message :", err.body.message);

        } else
          console.log(err);
      })


  }


  return (
    <>
      {!isModalOpen && <Icon iconSize={30} icon="add" className="addNewLocationButton" onClick={() => setIsModelOpen(!isModalOpen)} />}
      {isModalOpen && <div className="addLocationModal">

        <IconButton onClick={() => setIsModelOpen(!isModalOpen)}>
          <CloseIcon />
        </IconButton>

        <div className="Content">
          <form>
            <div className="title">
              <label>Title</label>
              <InputBase
                className="InputBase"
                autoComplete="off"
                aria-autocomplete="none"

                onChange={(val) => {
                  setNewLocation({ ...newLocation, name: val.target.value });
                }}
                placeholder="Title Of New Location"
              />
            </div>
            <div className="locationAddress">
              <label>Address</label>
              <InputBase
                className="InputBase"
                autoComplete="on"
                aria-autocomplete="none"
                onChange={(val) => {
                  setSearchAddress(val.target.value);
                }}
                onDoubleClick={GetAddressInformation}
                placeholder="Address Of Location"
              />

            </div>
            <div className="description">
              <label>Description</label>
              <InputBase
                className="InputBase"
                autoComplete="off"
                aria-autocomplete="none"
                onChange={(val) => {
                  setNewLocation({ ...newLocation, description: val.target.value });
                }}
                placeholder="Description"
              />
            </div>
            <div className="locationPictures">
              <label>Location Pictures</label>
              <input type="file" multiple />
            </div>

            <div className="gameList">
              <label>Game List</label>
              <input type="text" placeholder="Game List" />
            </div>
            <button type="button" onClick={AddNewLocation}>Add New Location</button>
          </form>
        </div>
      </div>}
    </>
  );
};

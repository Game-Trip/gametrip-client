import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AnnonymAuthController } from '../../utils/api/baseApi';

export default function EmailCheck() {
  const getUrlParameter = (url :string, parameterName:string ) => {
  parameterName = parameterName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  // Preserve plus and dot characters
  var decodedValue = decodeURIComponent(results[2].replace(/\+/g, "%20"));

  return decodedValue;
}
const navigate = useNavigate();
  // http://localhost:3000/Auth/ConfirmationMail?Token=CfDJ8Fz8hn0sCx5Hh/8JGXkoW6d6BlVaAa1je6taaJBouhlZVSJSI1B1t12fTFnK+dR8eUFJs4YOMQBKfNNCY1rWvc3ojXKJdjajIGXOKWYuSmiQIl5M1Zw41LKY9NhGRRxSZ8Outz4ZGDf2oxPiD2uDka3UpjkSXJylbpTyMZgIWhi6MGzNz94T6kZZqhJA+l211LpWq7XeXRMDK1cjgDx0AfKVauyl0qLd1iFqifjmurvNjo0PyePzqjvqssBrWFATgQ==&Email=mhdi.seddik+11@gmail.com
  useEffect(() => {
    const confirmEmail = async () => {
    const url = window.location.href;
    const splitUrl1 = url.split('?Token=');
    const splitUrl2 = splitUrl1[1].split('&Email=');
    const token = splitUrl2[0];
    const email = splitUrl2[1];
    console.log(token, email);
    const result = await AnnonymAuthController.authConfirmEmailPost({email: email || '', token: token || ''});
    navigate('/home');

    
  }
  confirmEmail();
  }, [])
  return (
    <div>Email has been verified, you can close this tab</div>
  )
}

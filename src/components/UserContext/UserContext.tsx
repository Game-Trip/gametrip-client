import React from 'react';
import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { parseJwt } from "../../utils/parseJwt";
import { useNavigate } from "react-router-dom";
import { AnnonymAuthController } from "../../utils/api/baseApi";
import { Alert, Snackbar } from "@mui/material";
import { ForgotPasswordDto, ResetPasswordDto } from "@game-trip/ts-api-client";

export interface User {
  userName: string;
  email: string;
  Id: string;
  jti: string;
  roles: string[];
  nbf: number;
  exp: number;
  iat: number;
  jwt: string;
}

export interface userContextProps {
  user?: User;
  isLogged: boolean;
  onLogin: (username: string, password: string) => void;
  onForgotPassword: (forgotPasswordDto: ForgotPasswordDto) => void;
  onResetPassword: (resetPasswordDto: ResetPasswordDto) => void;
  onRegister: (email: string, username: string, password: string) => void;
  onLogout: () => void;
}

interface Props {
  children?: ReactNode;
}
export const UserContext = createContext<userContextProps | undefined>(
  undefined
);
const GameWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [snackBarOpen, setSnackBarOpen] = useState({ open: false, message: "" });
  const isLogged = !!user;
  const navigate = useNavigate();
  const onLogin = async (username: string, password: string) => {
    await AnnonymAuthController.authLoginPost({ username, password }).then(
      (result) => {
        if (result.token) {
          setUser({
            ...parseJwt(result.token),
            jwt: result.token,
            isLogged: true,
          });
          navigate("/");
        }
      }
    );
  };
  const onLogout = () => {
    setUser(undefined);
    navigate("/");
  };

  const onRegister = async (
    email: string,
    username: string,
    password: string
  ) => {
    const result = await AnnonymAuthController.authRegisterPost({
      email,
      username,
      password,
      confirmPassword: password,
    }).then(() => {
      navigate("/");
      setSnackBarOpen({ open: true, message: "Un email de confirmation vous a été envoyé" });
    }).catch((err) => {
      setSnackBarOpen({ open: true, message: "Veuillez fournir un mot de passe plus complexe" });
    });
  };
  const onForgotPassword = async (forgotPasswordDto: ForgotPasswordDto) => {
    const result = await AnnonymAuthController.authForgotPasswordPost(forgotPasswordDto).then(() => {
      navigate("/");
      setSnackBarOpen({ open: true, message: "Un courriel de réinitialisation du mot de passe vous a été envoyé." });
    }).catch((err) => {
      console.log(err.message);
      setSnackBarOpen({ open: true, message: "Veuillez vérifier votre identifiant" });
    });
  };
  const onResetPassword = async (resetPasswordDto: ResetPasswordDto) => {
    const result = await AnnonymAuthController.authResetPasswordPost(resetPasswordDto).then(() => {
      navigate("/");
      setSnackBarOpen({ open: true, message: "Votre mot de passe a été réinitialisé" });
    }).catch((err) => {
      console.log(JSON.stringify(err.message));
      console.log((err.message.message));
      setSnackBarOpen({ open: true, message: "Veuillez fournir un mot de passe plus complexe" });
    });
  };

  return (
    <UserContext.Provider
      value={{ user, onLogin, isLogged, onRegister, onResetPassword, onForgotPassword, onLogout }}
    ><>

        {children}
        <Snackbar open={snackBarOpen.open} autoHideDuration={6000} onClose={() => setSnackBarOpen(
          { open: false, message: "" }
        )}>
          <Alert onClose={() => setSnackBarOpen(
            { open: false, message: "" }
          )} severity="info" sx={{ width: '100%' }}>
            {snackBarOpen.message}
          </Alert>
        </Snackbar>
      </>

    </UserContext.Provider>
  );
};

export default GameWrapper;

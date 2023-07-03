import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { parseJwt } from "../../utils/parseJwt";
import { useNavigate } from "react-router-dom";
import { AnnonymAuthController } from "../../utils/api/baseApi";
import { Alert, Snackbar } from "@mui/material";

export interface User {
  userName: string;
  email: string;
  Id: string;
  jti: string;
  Roles: string[];
  nbf: number;
  exp: number;
  iat: number;
  jwt: string;
}

export interface userContextProps {
  user?: User;
  isLogged: boolean;
  isAdmin: boolean;
  onLogin: (username: string, password: string) => void;
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
  const isAdmin = user?.Roles?.includes("Admin") ?? false;
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
      console.log(err.message);
      setSnackBarOpen({ open: true, message: "Veuillez fournir un mot de passe plus complexe" });
    });
  };

  return (
    <UserContext.Provider
      value={{ user, onLogin, isLogged, isAdmin, onRegister, onLogout }}
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

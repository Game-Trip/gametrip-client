import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { parseJwt } from "../../utils/parseJwt";
import { useNavigate } from "react-router-dom";
import { AnnonymAuthController } from "../../utils/api/baseApi";

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
    await AnnonymAuthController.authRegisterPost({
      email,
      username,
      password,
      confirmPassword: password,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <UserContext.Provider
      value={{ user, onLogin, isLogged, onRegister, onLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default GameWrapper;

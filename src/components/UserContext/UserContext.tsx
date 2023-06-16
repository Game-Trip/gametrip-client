import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { parseJwt } from "../../utils/parseJwt";
import { useNavigate } from "react-router-dom";

export interface User {
  userName: string;
  email: string;
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
    const options = {
      url: "https://staging-api.game-trip.fr/Auth/Login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: { username, password },
    };
    try {
      const result = await axios(options);
      if (result.data.token) {
        setUser({
          ...parseJwt(result.data.token),
          jwt: result.data.token,
          isLogged: true,
        });
        // setSnackBarInfo({
        //   isOpen: true,
        //   isError: false,
        //   message: "Login successful",
        // });
        // redirect to /
        // wait 2 sec
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.errorCode === "FailedLogin") {
        // setSnackBarInfo({
        //   isOpen: true,
        //   isError: true,
        //   message: error.response.data.message,
        // });
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, onLogin, isLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export default GameWrapper;

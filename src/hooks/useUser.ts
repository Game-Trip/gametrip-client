import { useContext } from "react";
import {
  UserContext,
  userContextProps,
} from "../components/UserContext/UserContext";

// Custom hook to access the game context
export const useUser = (): userContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useContext must be used within a GameWrapper");
  }

  return context;
};

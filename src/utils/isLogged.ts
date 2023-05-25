import { parseJwt } from "./parseJwt";

export const useIsLogged = () => {
  const jwt = localStorage.getItem("game-trip-jwt");
  if (!jwt) {
    return false;
  }
  const { exp } = parseJwt(jwt);
  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
};

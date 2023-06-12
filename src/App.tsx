import { IonApp, setupIonicReact } from "@ionic/react";
import React from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { css } from "@emotion/css";
import { AnimatePresence } from "framer-motion";
/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import "./theme/variables.css";
import { useLocation, useRoutes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { MapPage } from "./pages/Map/MapPage";
import LoginPage from "./pages/Login/LoginPage";


setupIonicReact();

const App: React.FC = () => {
    const [isLogged, setIsLogged] = React.useState(false);
    const element = useRoutes([
        {
            path: "/",
            element: <HomePage isLogged={isLogged} />,
        },
        {
            path: "/map",
            element: <MapPage isLogged={isLogged} />,
        },
        {
            path: "/login",
            element: <LoginPage setIsLogged={setIsLogged} isLogged={isLogged} />,
        },
    ]);

    const location = useLocation();

    if (!element) return null;

    return (
        <div className={styles.bg}>
            <AnimatePresence mode="wait" initial={false}>
                {React.cloneElement(element, { key: location.pathname })}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    bg: css`
    background-color: #f5f5f5;
  `,
};

export default App;

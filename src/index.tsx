import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <div className="bp4-dark">
      <App />
    </div>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

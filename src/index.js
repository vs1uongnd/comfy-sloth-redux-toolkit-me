import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getConfig } from "./Auth0/config";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./store";
import { Provider } from "react-redux";
// dev-crhi4dxofonu7fa1.us.auth0.com
// yeNV6YzxRyobfEPdLK40ZHwmm6s8cyx2

const config = getConfig();
const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  cacheLocation: "localstorage",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider {...providerConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);

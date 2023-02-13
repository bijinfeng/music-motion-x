import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import getReduxStore from "./store";

const store = getReduxStore({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App store={store} preloadedState={{}} helmetContext={{}} />
    </BrowserRouter>
  </React.StrictMode>
);

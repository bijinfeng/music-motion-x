import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import getReduxStore from "./store";

const store = getReduxStore({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App
      store={store}
      isServer={false}
      preloadedState={{}}
      helmetContext={{}}
    />
  </React.StrictMode>
);

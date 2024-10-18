import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";
import "./views/styles/reset.scss";
import "./views/styles/common.scss";
import { Provider } from "react-redux";
import { store } from "./data/store.ts";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);

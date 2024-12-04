import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ApiContextProvider from "./context/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </BrowserRouter>
  </>
);
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ApiContextProvider from "./context/ApiContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </BrowserRouter>
  </>
);

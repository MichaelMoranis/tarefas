import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "./contexts/ThemeContext"; // caminho conforme seu projeto
import { ListProvider } from "./contexts/ListContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </ThemeProvider>
  </React.StrictMode>
);

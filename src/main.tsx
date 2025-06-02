import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { TrafficStatsProvider } from "./contexts/TrafficStatsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TrafficStatsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TrafficStatsProvider>
    </LocalizationProvider>
  </StrictMode>
);

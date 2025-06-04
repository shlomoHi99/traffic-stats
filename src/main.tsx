import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { TrafficStatsProvider } from "./contexts/TrafficStatsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TrafficStatsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TrafficStatsProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  </StrictMode>
);

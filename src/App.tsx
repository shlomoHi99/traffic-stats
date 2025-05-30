import { Route, Routes } from "react-router";
import { trafficStats } from "./assets/trafficStats";
import AppMenu from "./components/AppMenu/AppMenu";
import TrafficStatsChart from "./components/TrafficStatsChart/TrafficStatsChart";
import TrafficStatsTable from "./components/TrafficStatsTable/TrafficStatsTable";

function App() {
  return (
    <>
      <AppMenu />
      <Routes>
        <Route
          path="/"
          element={<TrafficStatsChart trafficStats={trafficStats} />}
        />
        <Route
          path="/table"
          element={<TrafficStatsTable trafficStats={trafficStats} />}
        />
      </Routes>
    </>
  );
}

export default App;

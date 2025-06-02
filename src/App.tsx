import { Route, Routes } from "react-router";
import AppMenu from "./components/AppMenu/AppMenu";
import TrafficStatsChart from "./components/TrafficStatsChart/TrafficStatsChart";
import TrafficStatsTable from "./components/TrafficStatsTable/TrafficStatsTable";
import { useTrafficStats } from "./contexts/TrafficStatsContext";

function App() {
  const { trafficStatsState } = useTrafficStats();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "95vh",
      }}
    >
      <AppMenu />
      <Routes>
        <Route
          path="/"
          element={<TrafficStatsChart trafficStats={trafficStatsState} />}
        />
        <Route
          path="/table"
          element={<TrafficStatsTable trafficStats={trafficStatsState} />}
        />
      </Routes>
    </div>
  );
}

export default App;

import { BarChart } from "@mui/x-charts/BarChart";
import { trafficStats } from "../../assets/trafficStats";

const TrafficStatsChart = () => {
  return (
    <BarChart
      dataset={trafficStats}
      xAxis={[
        {
          dataKey: "date",
        },
      ]}
      series={[
        {
          dataKey: "visits",
          label: "visits",
        },
      ]}
      height={500}
    />
  );
};

export default TrafficStatsChart;

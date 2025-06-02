import { BarChart } from "@mui/x-charts/BarChart";
import { TrafficStatType } from "../../assets/trafficStats";

const TrafficStatsChart = ({
  trafficStats,
}: {
  trafficStats: TrafficStatType[];
}) => {
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
      height={400}
    />
  );
};

export default TrafficStatsChart;

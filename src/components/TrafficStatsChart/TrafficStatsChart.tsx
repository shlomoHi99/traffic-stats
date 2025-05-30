import { BarChart } from "@mui/x-charts/BarChart";
import { TrafficStatsType } from "../../assets/trafficStats";

const TrafficStatsChart = ({
  trafficStats,
}: {
  trafficStats: TrafficStatsType;
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
      height={500}
    />
  );
};

export default TrafficStatsChart;

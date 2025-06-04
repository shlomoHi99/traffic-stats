import { BarItemIdentifier } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";
import { TrafficStatType } from "../../assets/trafficStats";
import MutateEntry from "../MutateEntry/MutateEntry";

const TrafficStatsChart = ({
  trafficStats,
}: {
  trafficStats: TrafficStatType[];
}) => {
  const [entryToMutateData, setEntryToMutateData] = useState<TrafficStatType>();
  const [isMutateEntryPopupOpen, setMutateEntryPopupOpen] =
    useState<boolean>(false);

  const handleEntryClick = (
    _: React.MouseEvent<SVGElement, MouseEvent>,
    itemDefs: BarItemIdentifier
  ) => {
    const entry = trafficStats[itemDefs.dataIndex];
    setEntryToMutateData({ ...entry });
    setMutateEntryPopupOpen(true);
  };

  return (
    <>
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
        onItemClick={handleEntryClick}
      />
      {isMutateEntryPopupOpen && (
        <MutateEntry
          type="editOrDelete"
          isOpen={isMutateEntryPopupOpen}
          setOpen={setMutateEntryPopupOpen}
          oldDate={entryToMutateData?.date}
          oldVisits={entryToMutateData?.visits}
        />
      )}
    </>
  );
};

export default TrafficStatsChart;

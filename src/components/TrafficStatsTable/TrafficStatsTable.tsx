import { Button, ButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { forwardRef, Fragment, useState } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { TrafficStatType } from "../../assets/trafficStats";
import MutateEntry, { MutateEntryType } from "../MutateEntry/MutateEntry";

interface ColumnData {
  dataKey: keyof TrafficStatType;
  label: string;
  numeric?: boolean;
  width?: number;
}

const columns: ColumnData[] = [
  {
    width: 100,
    label: "Date",
    dataKey: "date",
  },
  {
    width: 100,
    label: "No. of Visits",
    dataKey: "visits",
  },
];

const VirtuosoTableComponents: TableComponents<TrafficStatType> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell
        key="buttons"
        variant="head"
        align="right"
        style={{ width: 100 }}
        sx={{ backgroundColor: "background.paper" }}
      ></TableCell>
    </TableRow>
  );
}

function rowContent(
  _index: number,
  row: TrafficStatType,
  setMutateType: (action: "edit" | "delete", row: TrafficStatType) => void
) {
  return (
    <Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
      <TableCell key="buttons" align="right">
        <ButtonGroup>
          <Button onClick={() => setMutateType("edit", row)}>update</Button>
          <Button onClick={() => setMutateType("delete", row)}>delete</Button>
        </ButtonGroup>
      </TableCell>
    </Fragment>
  );
}

export default function TrafficStatsTable({
  trafficStats,
}: {
  trafficStats: TrafficStatType[];
}) {
  const [entryToMutateData, setEntryToMutateData] = useState<TrafficStatType>();
  const [actionType, setActionType] = useState<MutateEntryType>("editOrDelete");
  const [isMutateEntryPopupOpen, setMutateEntryPopupOpen] =
    useState<boolean>(false);

  const setMutateType = (action: "edit" | "delete", row: TrafficStatType) => {
    setActionType(action);
    setMutateEntryPopupOpen(true);
    setEntryToMutateData(row);
  };

  return (
    <>
      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={trafficStats}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(_index: number, row: TrafficStatType) =>
            rowContent(_index, row, setMutateType)
          }
        />
      </Paper>
      {isMutateEntryPopupOpen && (
        <MutateEntry
          type={actionType}
          isOpen={isMutateEntryPopupOpen}
          setOpen={setMutateEntryPopupOpen}
          oldDate={entryToMutateData?.date}
          oldVisits={entryToMutateData?.visits}
        />
      )}
    </>
  );
}

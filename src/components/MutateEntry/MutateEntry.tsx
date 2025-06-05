import { Button, ButtonGroup, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { TrafficStatDate } from "../../assets/trafficStats";
import { useTrafficStats } from "../../contexts/TrafficStatsContext";
import PopUp from "../PopUp/PopUp";

type MutateEntryProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: MutateEntryType;
  oldDate?: TrafficStatDate;
  oldVisits?: number;
};

export type MutateEntryType = "add" | "edit" | "delete" | "editOrDelete";

const mutateConfig: Record<
  MutateEntryType,
  { title: (text?: string) => string; submitButtonText: string }
> = {
  add: { title: () => "Add Entry", submitButtonText: "add" },
  edit: { title: () => "Edit Entry", submitButtonText: "edit" },
  delete: {
    title: () => "Are You Sure You Want To Delete This Entry?",
    submitButtonText: "yes delete",
  },
  editOrDelete: {
    title: (date) => `What Would You Like To Do With The Data From ${date}?`,
    submitButtonText: "",
  },
} as const;

const MutateEntry = ({
  isOpen,
  setOpen,
  type,
  oldDate,
  oldVisits,
}: MutateEntryProps) => {
  const [mutateType, setMutateType] = useState<MutateEntryType>(type);
  const [date, setdate] = useState<Dayjs | null>(dayjs(oldDate));
  const [visits, setVisits] = useState<number>(oldVisits || 0);
  const { addEntry, deleteEntry } = useTrafficStats();
  const { enqueueSnackbar } = useSnackbar();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let message = "";
    if (mutateType === "delete") message = deleteEntry(oldDate!);
    else {
      if (!date) return;
      message = addEntry(date.format("YYYY-MM-DD") as TrafficStatDate, visits);
    }
    setOpen(false);
    enqueueSnackbar(message, { variant: "success" });
  };

  return (
    <PopUp
      cancelButtonText="cancel"
      isOpen={isOpen}
      setOpen={setOpen}
      title={mutateConfig[mutateType].title(oldDate)}
      submitButtonText={mutateConfig[mutateType].submitButtonText}
      submitFunction={submit}
    >
      {["add", "edit"].includes(mutateType) && (
        <DemoContainer components={["DatePicker", "TextField"]}>
          <DatePicker
            format="DD-MM-YYYY"
            value={date}
            onChange={(newDate) => setdate(newDate)}
            label="Pick a Date"
          />
          <TextField
            id="outlined-number"
            label="No. of Visits"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={visits}
            onChange={(e) => setVisits(+e.target.value)}
          />
        </DemoContainer>
      )}
      {mutateType === "editOrDelete" && (
        <ButtonGroup>
          <Button onClick={() => setMutateType("edit")}>update</Button>
          <Button onClick={() => setMutateType("delete")}>delete</Button>
        </ButtonGroup>
      )}
    </PopUp>
  );
};

export default MutateEntry;

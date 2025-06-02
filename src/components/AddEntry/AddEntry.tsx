import { TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useTrafficStats } from "../../contexts/TrafficStatsContext";
import PopUp from "../PopUp/PopUp";

type AddEntryProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddEntry = ({ isOpen, setOpen }: AddEntryProps) => {
  const [date, setdate] = useState<Dayjs | null>(dayjs());
  const [visits, setVisits] = useState<number>(0);
  const { addEntry } = useTrafficStats();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) return;
    const message = addEntry(date.format("YYYY-MM-DD"), visits);
    setOpen(false);
    alert(message);
  };

  return (
    <PopUp
      cancelButtonText="cancel"
      isOpen={isOpen}
      setOpen={setOpen}
      title="Add Entry"
      submitButtonText="add"
      submitFunction={submit}
    >
      <DemoContainer components={["DateField"]}>
        <DateField
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
    </PopUp>
  );
};

export default AddEntry;

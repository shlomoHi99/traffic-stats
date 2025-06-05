import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PropsWithChildren } from "react";

type PopUpProps = {
  title: string;
  cancelButtonText: string;
  submitButtonText: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunction: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function PopUp({
  title,
  cancelButtonText,
  submitButtonText,
  submitFunction,
  isOpen,
  setOpen,
  children,
}: PropsWithChildren<PopUpProps>) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: submitFunction,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelButtonText}</Button>
        {submitButtonText && <Button type="submit">{submitButtonText}</Button>}
      </DialogActions>
    </Dialog>
  );
}

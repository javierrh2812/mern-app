import Button from "components/button";
import { useState } from "react";
import { Backdrop, Dialog } from "@mui/material";

const ModalButton = ({ buttonProps, text, dialogProps, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpen(!open)}>
        {text}
      </Button>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onBackdropClick={() => setOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        {...dialogProps}
      >
        {children}
      </Dialog>
    </>
  );
};

export default ModalButton;

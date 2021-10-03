import { useState } from "react";
import { useAuth } from "hooks/useUser";
import { useSocket } from "hooks/useSocket";
import ExitIcon from "@mui/icons-material/ExitToApp";
import {
  Modal,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Logout = () => {
  const [open, setOpen] = useState(false);
  const { signout } = useAuth();
  const { disconnect } = useSocket();

  const FUERA = () => {
    disconnect();
    signout();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ padding: 0, margin: 0 }}>
        <ListItem>
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <ListItemText sx={{ textTransform: "none", color: "black" }}>
            Cerrar sesión
          </ListItemText>
        </ListItem>
      </Button>
      <Modal
        open={open}
        sx={style}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        onBackdropClick={() => setOpen(false)}
      >
        <Box>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={() => setOpen(false)}>no procd</Button>
          <Button onClick={() => FUERA()}>procd</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Logout;

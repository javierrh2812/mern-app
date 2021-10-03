import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ModalButton from "components/modalButton";
import Avatar from "@mui/material/Avatar";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/MailOutlined";
import PlaceIcon from "@mui/icons-material/MapOutlined";
import BookIcon from "@mui/icons-material/BookTwoTone";

const UserCard = ({ user }) => {
  const { firstName, lastName, specialization, avatarUrl } = user;

  const letters = firstName[0].toUpperCase() + lastName[0].toUpperCase();
  return (
    <Grid item xs={6} md={4} justifyItems="center">
      <Card variant="outlined">
        <CardContent>
          <Avatar sx={{ margin: "auto", height: "70px", width: "70px" }}>
            {avatarUrl ? <img src={avatarUrl} alt={`${firstName}`} /> : letters}
          </Avatar>
          <h3>{firstName + " " + lastName}</h3>
          <p>{specialization || "Sin especialización"}</p>
          <br />
        </CardContent>
        <CardActions>
          <ModalButton
            buttonProps={{ size: "small", color: "secondary" }}
            dialogProps={{ fullWidth: false }}
            text="ver mas"
          >
            <ModalContent user={user} />
          </ModalButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCard;

const ModalContent = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    description,
    specialization,
    campus,
    phoneNumber,
    email,
  } = user;

  const history = useHistory();

  return (
    <div style={{ maxWidth: "300px", padding: "2rem" }}>
      <span>PERFIL</span>
      <br />
      <h3>{`${firstName} ${lastName}`}</h3>
      <br />
      <p>{description || "El perfil aún no tiene descripción"}</p>
      <BookIcon /> {specialization || "-"}
      <br />
      <PlaceIcon /> {campus || "-"}
      <br />
      <PhoneIcon /> {phoneNumber || "-"}
      <br />
      <MailIcon /> {email || "-"}
      <br />
      <Button onClick={() => history.push("/chat/" + _id)}>
        Enviar mensaje
      </Button>
    </div>
  );
};

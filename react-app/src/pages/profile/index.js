import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import UserForm from "./userForm";
import ProfileForm from "./profileForm";
export default function Profile() {
  return (
    <Card square>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Mi perfil" />
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Ajustes de usuario / Cambio de contraseña" />
              <CardContent>
                <UserForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import React from "react";
import Grid from "@mui/material/Grid";
import UserCard from "./userCard";
import { listUsers } from "api/axios";

const UsersList = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    listUsers().then((res) => setUsers(res.data));
  }, []);
  return (
    <Grid container spacing={2}>
      {users.map((user, index) => (
        <UserCard key={user.firstName + index} user={user} />
      ))}
    </Grid>
  );
};

export default UsersList;

import React from "react";
import MuiButton from "@mui/material/Button";

const Button = (props) => (
  <MuiButton
    color="primary"
    fullWidth
    size="large"
    variant="contained"
    {...props}
  />
);

export default Button;

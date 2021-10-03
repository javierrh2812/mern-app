import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
const Input = ({ name, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });
  return (
    <TextField
      {...field}
      variant="outlined"
      margin="dense"
      fullWidth={true}
      helperText={Boolean(error) && (error.message || error)}
      {...props}
      error={Boolean(error)}
    />
  );
};
export default Input;

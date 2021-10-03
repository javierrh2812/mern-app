import { Select, TextField } from "@mui/material";

const Filter = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <TextField id="search" name="search" label="Búsqueda" />
      <Select label="Programa de especialización"></Select>
      <Select label="Ordenar por"></Select>
    </div>
  );
};

export default Filter;

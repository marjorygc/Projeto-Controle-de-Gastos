import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Editar({ onClick }) {
  return (
    <Tooltip title="Editar">
      <IconButton color="primary" onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

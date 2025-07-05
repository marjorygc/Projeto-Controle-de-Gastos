import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Remover({ onClick }) {
  return (
    <Tooltip title="Remover">
      <IconButton color="error" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

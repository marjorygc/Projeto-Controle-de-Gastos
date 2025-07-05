import React, { useState } from "react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Filtrar({ filtroTipo, setFiltroTipo }) {
  const [anchorEl, setAnchorEl] = useState(null); // controla o menu aberto

  const abrirMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const fecharMenu = () => {
    setAnchorEl(null);
  };

  const selecionarFiltro = (tipo) => {
    setFiltroTipo(tipo); // altera o filtro no pai
    fecharMenu(); // fecha o menu depois de selecionar
  };

  return (
    <>
      <Tooltip title="Filtrar despesas">
        <IconButton color="primary" onClick={abrirMenu}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={fecharMenu}
      >
        <MenuItem onClick={() => selecionarFiltro("")}>
          Todas
        </MenuItem>
        <MenuItem onClick={() => selecionarFiltro("Fixa")}>
          Fixa
        </MenuItem>
        <MenuItem onClick={() => selecionarFiltro("Variável")}>
          Variável
        </MenuItem>
      </Menu>
    </>
  );
}

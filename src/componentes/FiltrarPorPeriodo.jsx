import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FiltrarPorPeriodo({ setFiltroPeriodo }) {
  const [anchorEl, setAnchorEl] = useState(null); // controla menu principal
  const [anchorPopover, setAnchorPopover] = useState(null); // controla popover do período

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const abrirMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const fecharMenu = () => {
    setAnchorEl(null);
  };

  // Abre popover do filtro por período, fecha menu principal
  const abrirPopoverPeriodo = (event) => {
    setAnchorPopover(event.currentTarget);
    fecharMenu();
  };

  const fecharPopover = () => {
    setAnchorPopover(null);
  };

  const aplicarFiltro = () => {
    setFiltroPeriodo([dataInicio, dataFim]);
    fecharPopover();
  };

  const limparFiltro = () => {
    setDataInicio("");
    setDataFim("");
    setFiltroPeriodo(["", ""]);
    fecharPopover();
  };

  return (
    <>
      <Tooltip title="Filtrar">
        <IconButton color="primary" onClick={abrirMenu}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      {/* Menu principal */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={fecharMenu}
      >
        <MenuItem
          onClick={() => {
            setFiltroPeriodo(["", ""]);
            fecharMenu();
          }}
        >
          Ver Todas
        </MenuItem>
        <MenuItem onClick={abrirPopoverPeriodo}>Filtrar por Período</MenuItem>
      </Menu>

      {/* Popover com campos de data */}
      <Popover
        open={Boolean(anchorPopover)}
        anchorEl={anchorPopover}
        onClose={fecharPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            p: 2,
            width: 280,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="subtitle1">Selecionar Período</Typography>
          <TextField
            label="Data Início"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data Fim"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={limparFiltro}>
              Limpar
            </Button>
            <Button variant="contained" onClick={aplicarFiltro}>
              Aplicar
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

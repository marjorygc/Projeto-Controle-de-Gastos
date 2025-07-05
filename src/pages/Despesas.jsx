import React, { useState } from "react";
import Menu from "../componentes/Menu";
import "./styles/Despesas.css";
import Filtrar from "../componentes/Filtrar";
import TabDespesas from "../componentes/TabDespesas";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Despesas() {
  const [filtroTipo, setFiltroTipo] = useState(""); // filtro vazio = todas
  const [abrirForm, setAbrirForm] = useState(false);
  const [novaDespesa, setNovaDespesa] = useState({
    nome: "",
    valor: "",
    tipo: "Fixa",
    categoria: "",
  });

  const handleAbrir = () => setAbrirForm(true);

  const handleFechar = () => {
    setAbrirForm(false);
    setNovaDespesa({ nome: "", valor: "", tipo: "Fixa", categoria: "" });
  };

  const handleSalvar = () => {
    if (
      novaDespesa.nome &&
      novaDespesa.valor &&
      novaDespesa.tipo &&
      novaDespesa.categoria
    ) {
      const evento = new CustomEvent("nova-despesa", { detail: novaDespesa });
      window.dispatchEvent(evento);
      handleFechar();
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div>
      <Menu />

      <div className="despesas">
        <div className="topo">
          <Filtrar filtroTipo={filtroTipo} setFiltroTipo={setFiltroTipo} />
          <h1>Despesas</h1>
          <div className="btdespesas">
            <Tooltip title="Adicionar despesa">
              <IconButton color="success" onClick={handleAbrir}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div>
          <TabDespesas filtroTipo={filtroTipo} />
        </div>
      </div>

      {/* Modal para adicionar despesa */}
      <Dialog open={abrirForm} onClose={handleFechar}>
        <DialogTitle>Nova Despesa</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={novaDespesa.nome}
            onChange={(e) =>
              setNovaDespesa({ ...novaDespesa, nome: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Valor"
            type="number"
            fullWidth
            value={novaDespesa.valor}
            onChange={(e) =>
              setNovaDespesa({ ...novaDespesa, valor: e.target.value })
            }
          />
          <TextField
            select
            margin="dense"
            label="Tipo"
            fullWidth
            value={novaDespesa.tipo}
            onChange={(e) =>
              setNovaDespesa({ ...novaDespesa, tipo: e.target.value })
            }
          >
            <MenuItem value="Fixa">Fixa</MenuItem>
            <MenuItem value="Variável">Variável</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Categoria"
            fullWidth
            value={novaDespesa.categoria}
            onChange={(e) =>
              setNovaDespesa({ ...novaDespesa, categoria: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFechar}>Cancelar</Button>
          <Button onClick={handleSalvar} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

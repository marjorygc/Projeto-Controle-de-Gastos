import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiltrarPorPeriodo from "./FiltrarPorPeriodo";
import "./styles/Tabela.css"; // estilos

const Tabela = forwardRef(({ onSaldoChange }, ref) => {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    tipo: "Receita",
    nome: "",
    valor: "",
    categoria: "",
    data: "",
  });

  const [totais, setTotais] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoFinal: 0,
  });

  const [filtroPeriodo, setFiltroPeriodo] = useState(["", ""]);

  // Filtrar os dados pelo período selecionado
  const dadosFiltrados = dados.filter((item) => {
    const dataItem = new Date(item.data);
    const inicio = filtroPeriodo[0] ? new Date(filtroPeriodo[0]) : null;
    const fim = filtroPeriodo[1] ? new Date(filtroPeriodo[1]) : null;
    return (!inicio || dataItem >= inicio) && (!fim || dataItem <= fim);
  });

  // Carregar dados do LocalStorage ao montar o componente
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("lancamentos")) || [];
    setDados(dadosSalvos);
  }, []);

  // Atualizar totais sempre que dados ou filtro mudarem (usar dadosFiltrados)
  useEffect(() => {
    calcularTotais(dadosFiltrados);
  }, [dadosFiltrados]);

  // Expor método para abrir modal com botão CRIAR
  useImperativeHandle(ref, () => ({
    abrirModal: () => {
      setForm({
        id: null,
        tipo: "Receita",
        nome: "",
        valor: "",
        categoria: "",
        data: "",
      });
      setModalOpen(true);
    },
  }));

  // Calcular totais e saldo baseado na lista passada (dados filtrados)
  const calcularTotais = (lista) => {
    let totalReceitas = 0;
    let totalDespesas = 0;

    lista.forEach((item) => {
      const valor = parseFloat(item.valor);
      if (item.tipo === "Receita") totalReceitas += valor;
      else totalDespesas += valor;
    });

    const saldoFinal = totalReceitas - totalDespesas;
    const novosTotais = {
      totalReceitas,
      totalDespesas,
      saldoFinal,
    };

    setTotais(novosTotais);
    if (onSaldoChange) {
      onSaldoChange(novosTotais);
    }
  };

  // Salvar no LocalStorage
  const salvarLocalStorage = (lista) => {
    localStorage.setItem("lancamentos", JSON.stringify(lista));
  };

  // Adicionar ou editar lançamento
  const handleSalvar = () => {
    if (!form.nome || !form.valor || !form.data || !form.categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    let novaLista;
    if (form.id === null) {
      // Adicionar
      const novoItem = { ...form, id: Date.now() };
      novaLista = [...dados, novoItem];
    } else {
      // Editar
      novaLista = dados.map((item) =>
        item.id === form.id ? form : item
      );
    }

    setDados(novaLista);
    salvarLocalStorage(novaLista);
    setModalOpen(false);
  };

  // Excluir lançamento
  const handleExcluir = (id) => {
    const novaLista = dados.filter((item) => item.id !== id);
    setDados(novaLista);
    salvarLocalStorage(novaLista);
  };

  // Editar lançamento - abre modal preenchido
  const handleEditar = (item) => {
    setForm(item);
    setModalOpen(true);
  };

  return (
    <div className="tabela-container">
      <div className="tabela-header">
        <h2>Receitas e Despesas</h2>
        {/* Passa a função para atualizar o filtro */}
        <FiltrarPorPeriodo setFiltroPeriodo={setFiltroPeriodo} />

        <Tooltip title="Adicionar lançamento">
          <IconButton
            color="success"
            onClick={() => {
              setForm({
                id: null,
                tipo: "Receita",
                nome: "",
                valor: "",
                categoria: "",
                data: "",
              });
              setModalOpen(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* TABELA - usa dadosFiltrados para mostrar só o que está no filtro */}
      <TableContainer component={Paper} className="scrollable-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dadosFiltrados.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>R$ {parseFloat(item.valor).toFixed(2)}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.data}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleEditar(item)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton onClick={() => handleExcluir(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {dadosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum lançamento cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* TOTAIS */}
      <div className="totais">
        <p>
          Total Receitas:{" "}
          <strong style={{ color: "green" }}>
            R$ {totais.totalReceitas.toFixed(2)}
          </strong>
        </p>
        <p>
          Total Despesas:{" "}
          <strong style={{ color: "red" }}>
            R$ {totais.totalDespesas.toFixed(2)}
          </strong>
        </p>
      </div>

      {/* MODAL */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {form.id === null ? "Adicionar Lançamento" : "Editar Lançamento"}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Tipo"
            fullWidth
            margin="dense"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          >
            <MenuItem value="Receita">Receita</MenuItem>
            <MenuItem value="Despesa">Despesa</MenuItem>
          </TextField>
          <TextField
            label="Nome"
            fullWidth
            margin="dense"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            label="Valor"
            type="number"
            fullWidth
            margin="dense"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
          <TextField
            label="Categoria"
            fullWidth
            margin="dense"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          <TextField
            label="Data"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSalvar}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Tabela;

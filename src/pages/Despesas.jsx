
import { useState, useRef } from "react";
import Menu from "../componentes/Menu";
import "./styles/Despesas.css";
import Filtrar from "../componentes/Filtrar"; // Seu componente Filtrar
import TabDespesas from "../componentes/TabDespesas"; // Seu componente TabDespesas
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
    const [filtroTipo, setFiltroTipo] = useState("");
    const [abrirForm, setAbrirForm] = useState(false);
    const [novaDespesa, setNovaDespesa] = useState({
        nome: "",
        tipo: "Fixa",
        categoria: "",
    });

    const tabDespesasRef = useRef();

    // Esta função será passada para o Menu
    const handleAbrirModal = () => setAbrirForm(true);

    const handleFecharModal = () => {
        setAbrirForm(false);
        setNovaDespesa({ nome: "", tipo: "Fixa", categoria: "" });
    };

    const handleNovaDespesaChange = (e) => {
        const { name, value } = e.target;
        setNovaDespesa({ ...novaDespesa, [name]: value });
    };

    const handleSalvarDespesa = () => {
        if (!novaDespesa.nome || !novaDespesa.tipo || !novaDespesa.categoria) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (tabDespesasRef.current && tabDespesasRef.current.adicionarDespesa) {
            tabDespesasRef.current.adicionarDespesa(novaDespesa);
        } else {
            console.error("TabDespesas: Método 'adicionarDespesa' não encontrado na ref.");
        }

        handleFecharModal();
    };

    return (
        <div>
            {/* Passa a função para o Menu para abrir o modal */}
            <Menu abrirModal={handleAbrirModal} />

            <div className="despesas">
                <div className="topo">
                    <Filtrar filtroTipo={filtroTipo} setFiltroTipo={setFiltroTipo} />
                    <h1>Despesas</h1>
                    <div className="btdespesas">
                        <Tooltip title="Adicionar despesa">
                            <IconButton color="success" onClick={handleAbrirModal}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <TabDespesas filtroTipo={filtroTipo} ref={tabDespesasRef} />
                </div>
            </div>

            {/* Modal para adicionar despesa */}
            <Dialog open={abrirForm} onClose={handleFecharModal}>
                <DialogTitle>Nova Despesa</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nome"
                        fullWidth
                        name="nome"
                        value={novaDespesa.nome}
                        onChange={handleNovaDespesaChange}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Tipo"
                        fullWidth
                        name="tipo"
                        value={novaDespesa.tipo}
                        onChange={handleNovaDespesaChange}
                    >
                        <MenuItem value="Fixa">Fixa</MenuItem>
                        <MenuItem value="Variável">Variável</MenuItem>
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Categoria"
                        fullWidth
                        name="categoria"
                        value={novaDespesa.categoria}
                        onChange={handleNovaDespesaChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFecharModal}>Cancelar</Button>
                    <Button onClick={handleSalvarDespesa} variant="contained" color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
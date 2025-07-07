// src/componentes/Menu.js
import "./styles/Menu.css";
import Logobranca from "../assets/Logobranca .png";
import { useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom"; // Importar useNavigate para navegação
import {
    Button,
    Menu as MuiMenu, // Renomear para evitar conflito com seu componente Menu
    MenuItem,
    Box // Para agrupar o botão e o menu
} from "@mui/material"; // Importar componentes do Material UI

export default function Menu({ abrirModal }) {
    const navigate = useNavigate(); // Hook para navegação
    const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar o âncora do menu (onde ele abre)
    const open = Boolean(anchorEl); // Verifica se o menu está aberto

    const handleClick = (event) => {
        // Quando o botão CRIAR é clicado, abre o menu
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // Fecha o menu
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        // Função para navegar para a rota selecionada
        if (path === 'home') {
            // Se for para a Home, verificamos se a função abrirModal é válida
            // e se estamos na página Home, chamamos o modal da Home
            if (window.location.pathname === "/Home" && abrirModal) {
                 abrirModal(); // Chama o modal da Home
            } else {
                 navigate("/Home"); // Navega para a Home
            }
        } else if (path === 'despesas') {
            // Se for para Despesas, verificamos se a função abrirModal é válida
            // e se estamos na página Despesas, chamamos o modal de Despesas
            if (window.location.pathname === "/Despesas" && abrirModal) {
                abrirModal(); // Chama o modal de Despesas
            } else {
                navigate("/Despesas"); // Navega para Despesas
            }
        } else {
            // Caso especial para quando o Menu está na página Estatísticas,
            // e o usuário quer adicionar uma Receita/Despesa, ele deve ir para Home
            // ou Despesas e abrir o modal lá.
            // Poderíamos adicionar lógica mais sofisticada se quiséssemos um modal
            // diretamente de Estatísticas, mas por agora, vamos redirecionar.
            if (path === '/Home') {
                navigate('/Home');
            } else if (path === '/Despesas') {
                navigate('/Despesas');
            }
        }
        handleClose(); // Sempre fecha o menu após a seleção
    };

    return (
        <div id="menu">
            <div className="left">
                <img src={Logobranca} alt="logo" height={50} />
                <a href="/Home">Home</a>
                <a href="/Despesas">Despesas</a>
                <a href="/Estatisticas">Estatísticas</a>
            </div>

            {/* O Botão CRIAR que abre o menu de seleção */}
            <Box>
                <Button
                    id="criar-button"
                    aria-controls={open ? 'criar-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(70deg, rgb(17, 60, 124) 0%, rgb(90, 155, 253) 150%)',
                      color: 'white', // A cor do texto
                      padding: '15px',
                      border: 'none', // 'none' para remover a borda padrão do Button se houver
                      borderRadius: '15px',
                      fontWeight: 'bold',
                      // Adicionais para um bom comportamento do botão
                      cursor: 'pointer',
                      textTransform: 'uppercase', // Se o texto do botão for "CRIAR"
                      whiteSpace: 'nowrap', // Impede que o texto quebre linha
                      transition: 'background 0.3s ease, box-shadow 0.3s ease', // Transição para o hover
                      '&:hover': { // Estilos para o estado hover
                        background: 'linear-gradient(70deg, rgb(25, 75, 140) 0%, rgb(100, 165, 255) 150%)', // Gradiente ligeiramente alterado ou mais escuro
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra no hover para efeito de elevação
                      },
                     
                      minWidth: '100px' 
                    }}
                >
                    CRIAR
                </Button>
                <MuiMenu // Menu do Material UI
                    id="criar-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'criar-button',
                    }}
                >
                    {/* Opções do menu */}
                    <MenuItem onClick={() => handleNavigate('home')}>
                        Lançamento (Home)
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate('despesas')}>
                        Despesa Fixa/Variável
                    </MenuItem>
                </MuiMenu>
            </Box>
        </div>
    );
}
// src/components/TabDespesas.js
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./styles/TabDespesas.css";
import Remover from "./Remover";
import Editar from "./Editar";

const TabDespesas = forwardRef(({ filtroTipo }, ref) => {
    const [dados, setDados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdicao, setFormEdicao] = useState({
        nome: "",
        tipo: "Fixa",
        categoria: ""
    });

    // Função dedicada para salvar dados no localStorage
    const salvarDadosLocalStorage = (lista) => {
        try {
            const listaJSON = JSON.stringify(lista);
            localStorage.setItem("despesas", listaJSON); // Chave consistente: "despesas"
            console.log("TabDespesas: Dados salvos com sucesso no localStorage:", lista);
        } catch (error) {
            console.error("TabDespesas: Erro ao salvar dados no localStorage:", error);
        }
    };

    // 1. Efeito para carregar dados do localStorage UMA VEZ ao montar o componente
    useEffect(() => {
        console.log("TabDespesas: Tentando carregar dados do localStorage...");
        try {
            const dadosSalvos = localStorage.getItem("despesas"); // Carrega da chave "despesas"
            console.log("TabDespesas: Conteúdo bruto do localStorage ('despesas'):", dadosSalvos);

            if (dadosSalvos) {
                const parsedDados = JSON.parse(dadosSalvos);
                setDados(parsedDados); // Atualiza o estado com os dados carregados
                console.log("TabDespesas: Dados carregados do localStorage na inicialização:", parsedDados);
            } else {
                console.log("TabDespesas: Nenhuma 'despesas' encontrada no localStorage, inicializando com array vazio.");
                setDados([]); // Garante que o estado seja um array vazio se não houver dados
            }
        } catch (error) {
            console.error("TabDespesas: Erro ao carregar/parsear dados do localStorage:", error);
            setDados([]); // Em caso de erro (dados malformados), inicializa como array vazio
        }
    }, []); // Array de dependências vazio para rodar apenas na montagem

    // 2. REMOVEMOS O useEffect([dados]) DE SALVAMENTO AUTOMÁTICO AQUI!
    // O salvamento será feito de forma explícita nas funções que modificam 'dados'.

    // Expõe a função 'adicionarDespesa'
    useImperativeHandle(ref, () => ({
        adicionarDespesa: (novaDespesaRecebida) => {
            const despesaComId = {
                ...novaDespesaRecebida,
                id: Date.now(), // Garante um ID único
            };
            setDados((prev) => {
                const novaLista = [...prev, despesaComId];
                salvarDadosLocalStorage(novaLista); // <<< CHAMA SALVAR AQUI
                console.log("TabDespesas: Nova despesa adicionada e salva:", novaLista);
                return novaLista;
            });
        },
    }));

    // Remover despesa
    const handleRemover = (id) => {
        setDados((prev) => {
            const novaLista = prev.filter((item) => item.id !== id);
            salvarDadosLocalStorage(novaLista); // <<< CHAMA SALVAR AQUI
            console.log("TabDespesas: Despesa removida e salva:", novaLista);
            return novaLista;
        });
    };

    // Iniciar edição (lógica inalterada)
    const iniciarEdicao = (item) => {
        setEditandoId(item.id);
        setFormEdicao({
            nome: item.nome,
            tipo: item.tipo,
            categoria: item.categoria,
        });
        console.log("TabDespesas: Iniciando edição para item:", item.id);
    };

    // Salvar edição
    const salvarEdicao = (id) => {
        if (!formEdicao.nome || !formEdicao.categoria) {
            alert("Nome e Categoria são obrigatórios.");
            return;
        }

        setDados((prev) => {
            const novaLista = prev.map((item) =>
                item.id === id ? { ...item, ...formEdicao } : item
            );
            salvarDadosLocalStorage(novaLista); // <<< CHAMA SALVAR AQUI
            console.log("TabDespesas: Despesa editada e salva:", novaLista);
            return novaLista;
        });
        setEditandoId(null);
    };

    // Cancelar edição (lógica inalterada)
    const cancelarEdicao = () => {
        setEditandoId(null);
        setFormEdicao({
            nome: "",
            tipo: "Fixa",
            categoria: ""
        });
        console.log("TabDespesas: Edição cancelada.");
    };

    // Aplicar filtro pelo tipo (lógica inalterada)
    const dadosFiltrados = filtroTipo
        ? dados.filter((item) => item.tipo === filtroTipo)
        : dados;

    return (
        <div className="tab-despesas-container">
            <table className="tab_despesas">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="4">Nenhuma despesa para exibir. Adicione uma nova despesa.</td>
                        </tr>
                    ) : (
                        dadosFiltrados.map((item) => (
                            <tr key={item.id}>
                                {editandoId === item.id ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="nome"
                                                value={formEdicao.nome}
                                                onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="tipo"
                                                value={formEdicao.tipo}
                                                onChange={(e) => setFormEdicao({ ...formEdicao, tipo: e.target.value })}
                                            >
                                                <option value="Fixa">Fixa</option>
                                                <option value="Variável">Variável</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="categoria"
                                                value={formEdicao.categoria}
                                                onChange={(e) => setFormEdicao({ ...formEdicao, categoria: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                                            <button onClick={cancelarEdicao}>Cancelar</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{item.nome}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.categoria}</td>
                                        <td>
                                            <Remover onClick={() => handleRemover(item.id)} />
                                            <Editar onClick={() => iniciarEdicao(item)} />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
});

export default TabDespesas;
import { useState } from "react";
import "./styles/TabDespesas.css"
import "../pages/Despesas"
import Remover from "./Remover"
import Editar from "./Editar"

export default function TabDespesas(){

    const [dados, setDados] = useState([
    { id: 1, nome: "Conta de Luz", valor: 120, tipo: "Fixa", categoria: "Casa" },
    { id: 2, nome: "Internet", valor: 80, tipo: "Fixa", categoria: "Trabalho" }
    ]);

    const [editandoId, setEditandoId] = useState(null);

    const [formEdicao, setFormEdicao] = useState({
    nome: "",
    valor: "",
    tipo: "",
    categoria: ""
    });


    const handleRemover = (id) => {
        const novosDados = dados.filter((item) => item.id !== id);
        setDados(novosDados);
    };


    return(
        <table className="tab_despesas">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((item) => {
                    let nomeCelula, valorCelula, tipoCelula, categoriaCelula;

                    if (editandoId === item.id) {
                        nomeCelula = (
                        <input
                            value={formEdicao.nome}
                            onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                        />
                        );
                        valorCelula = (
                        <input
                            value={formEdicao.valor}
                            onChange={(e) => setFormEdicao({ ...formEdicao, valor: e.target.value })}
                        />
                        );
                        tipoCelula = (
                        <input
                            value={formEdicao.tipo}
                            onChange={(e) => setFormEdicao({ ...formEdicao, tipo: e.target.value })}
                        />
                        );
                        categoriaCelula = (
                        <input
                            value={formEdicao.categoria}
                            onChange={(e) => setFormEdicao({ ...formEdicao, categoria: e.target.value })}
                        />
                        );
                    } else {
                        nomeCelula = item.nome;
                        valorCelula = item.valor;
                        tipoCelula = item.tipo;
                        categoriaCelula = item.categoria;
                    }

                <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.valor}</td>
                    <td>{item.tipo}</td>
                    <td>{item.categoria}</td>
                    <td><Remover onClick={() => handleRemover(item.id)}/></td>
                    <td>
                        {editandoId === item.id ? (
                            <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                            ) : (
                            <button onClick={() => iniciarEdicao(item)}>Editar</button>
                            )}
                    </td>
                </tr>
})}
            </tbody>
        </table>
    )
}
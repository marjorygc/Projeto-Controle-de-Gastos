import { useState, useEffect } from "react";
import "./styles/TabDespesas.css";
import Remover from "./Remover";
import Editar from "./Editar";

export default function TabDespesas({ filtroTipo }) {
  const [dados, setDados] = useState([
    { id: 1, nome: "Conta de Luz", valor: 120, tipo: "Fixa", categoria: "Casa" },
    { id: 2, nome: "Internet", valor: 80, tipo: "Fixa", categoria: "Trabalho" },
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({
    nome: "",
    valor: "",
    tipo: "Fixa",
    categoria: ""
  });

  // Adiciona novas despesas via evento
  useEffect(() => {
    const adicionarDespesa = (e) => {
      const novaDespesa = { ...e.detail, id: Date.now() };
      setDados((prev) => [...prev, novaDespesa]);
    };
    window.addEventListener("nova-despesa", adicionarDespesa);
    return () => window.removeEventListener("nova-despesa", adicionarDespesa);
  }, []);

  // Remove despesa pelo id
  const handleRemover = (id) => {
    setDados((prev) => prev.filter((item) => item.id !== id));
  };

  // Inicia edição preenchendo formulário
  const iniciarEdicao = (item) => {
    setEditandoId(item.id);
    setFormEdicao({
      nome: item.nome,
      valor: item.valor,
      tipo: item.tipo,
      categoria: item.categoria,
    });
  };

  // Salva edição e sai do modo edição
  const salvarEdicao = (id) => {
    setDados((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...formEdicao } : item
      )
    );
    setEditandoId(null);
  };

  // Cancela edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdicao({
      nome: "",
      valor: "",
      tipo: "Fixa",
      categoria: ""
    });
  };

  // Aplica filtro pelo tipo, se houver filtro
  const dadosFiltrados = filtroTipo
    ? dados.filter((item) => item.tipo === filtroTipo)
    : dados;

  return (
    <div>
        <table className="tab_despesas">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dadosFiltrados.map((item) => (
          <tr key={item.id}>
            {editandoId === item.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={formEdicao.nome}
                    onChange={(e) =>
                      setFormEdicao({ ...formEdicao, nome: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={formEdicao.valor}
                    onChange={(e) =>
                      setFormEdicao({ ...formEdicao, valor: e.target.value })
                    }
                  />
                </td>
                <td>
                  <select
                    value={formEdicao.tipo}
                    onChange={(e) =>
                      setFormEdicao({ ...formEdicao, tipo: e.target.value })
                    }
                  >
                    <option value="Fixa">Fixa</option>
                    <option value="Variável">Variável</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={formEdicao.categoria}
                    onChange={(e) =>
                      setFormEdicao({ ...formEdicao, categoria: e.target.value })
                    }
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
                <td>{item.valor}</td>
                <td>{item.tipo}</td>
                <td>{item.categoria}</td>
                <td>
                  <Remover onClick={() => handleRemover(item.id)} />
                  <Editar onClick={() => iniciarEdicao(item)} />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  );
}

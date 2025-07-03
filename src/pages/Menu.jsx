import "../pages/Menu.css"
export default function Menu(){
    return(
        
        <div id="menu">
            <div className="left">
                <a href="/Home">Home</a>
                <a href="/Despesas">Despesas</a>
                <a href="/Estatisticas">Estatísticas</a>
            </div>
            <button id="criar">CRIAR</button>
        </div>

    )
}
import Menu from "./Menu"
import Tabela from "./Tabela"
import "./Home.css"
export default function Home(){
    return(
        <div className="home">
            <Menu/>
            <div className="saldo">
                <h2>Saldo</h2>
                <p>R$1000,00</p>
            </div>
            <Tabela />
        </div>
    )
}
import Menu from "../componentes/Menu"
import "./styles/Despesas.css"
import Filtrar from '../componentes/Filtrar'
import TabDespesas from "../componentes/TabDespesas"

export default function Despesas(){
    return(
        <div>
            <Menu/>
            
            <div className="despesas">
                <div className="topo">
                    <Filtrar/> 
                    <h1>Despesas</h1>
                    <div className="btdespesas">
                        <button id="plus">+</button>
                    </div>
                </div>
                <div>
                    <TabDespesas/>
                </div>
            </div>
        </div>
    )
}
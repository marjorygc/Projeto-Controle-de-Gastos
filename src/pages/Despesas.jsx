import Menu from "../componentes/Menu"
import "./styles/Despesas.css"
import Filtrar from '../componentes/Filtrar'
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

                
               
            </div>
        </div>
    )
}
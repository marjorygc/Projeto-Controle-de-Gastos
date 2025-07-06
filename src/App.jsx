import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Despesas from './pages/Despesas'
import Estatisticas from './pages/Estatisticas'
import Cadastro from './componentes/Cadastro'


export default function App(){

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login/>}></Route>
          <Route path = "/Home" element = {<Home/>}></Route>
          <Route path = "/Despesas" element = {<Despesas/>}></Route>
          <Route path = "/Estatisticas" element = {<Estatisticas/>}></Route>
          <Route path = "/Cadastro" element = {<Cadastro/>}></Route>
          <Route path = "/Login" element = {<Login/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
)
  
}